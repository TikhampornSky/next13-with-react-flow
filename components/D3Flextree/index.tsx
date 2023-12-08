"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, PanOnScrollMode, Background, MiniMap, BackgroundVariant } from "reactflow";
import { flextree, FlextreeOptions } from 'd3-flextree';
import { getInitialNodesAndEdges, groupMember } from './node-edges';
import { findTopologicalSortDFS } from "./algorithm";
import SingleNode from "./CustomNode/SingleNode";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
import { gapBetweenNodeInVertical, nodeHeight, nodeWidth } from "./constant";
import { GroupType } from "./data";
import 'reactflow/dist/style.css';
 
interface NodeData {
    id: string;
    children?: NodeData[];
    size?: [number, number]; // [width, height]
}

const options: FlextreeOptions<NodeData> = {
    nodeSize: (node) => {
        let sizee = calculateNodeSize(node.data.id!)
        return sizee;
    },
    spacing: 100,
    children: (node) => {
        return node.children;
    }
};

function calculateNodeSize(nodeId: string): [number, number] {
    const nodeInfo = groupMember.get(nodeId)
    if (!nodeInfo) {
        return [nodeWidth, nodeHeight]
    }
    let memberCount = nodeInfo.members.length || 1;
    let w, h;
    if (nodeInfo.type === GroupType.Unordered) {
        w = nodeWidth * memberCount;
        h = nodeHeight;
    } else if (nodeInfo.type === GroupType.Ordered) {
        w = nodeWidth;
        h = nodeHeight * memberCount;
    } else {
        w = nodeWidth;
        h = nodeHeight;
    }
    // console.log("calculateNodeSize: ", nodeId, w, h)
    return [w, h + gapBetweenNodeInVertical];
}

function recur(id: string, hierarchyChildren: NodeData[]) {
    let s: NodeData = {} as NodeData;
    s.id = id
    s.children = [];
    hierarchyChildren.push(s);

    const neighborIds = groupMember.get(id)?.next || [];
    for (let i = 0; i < neighborIds.length; i++) {
        const neighborId = neighborIds[i];
        recur(neighborId, s.children);
    }
}

function generateStructForFlextree(hierarchy: NodeData, rootId: string) {
    hierarchy.id = rootId;
    hierarchy.children = [];

    const neighborIds = groupMember.get(rootId)?.next || [];
    for (let i = 0; i < neighborIds.length; i++) {
        const neighborId = neighborIds[i];
        recur(neighborId, hierarchy.children);
    }

    return hierarchy;
}

function calculateLayoutNodes(nodes: Node<any, string | undefined>[], edges: Edge<any>[]) {
    const flextreeFunction = flextree;
    const layout = flextreeFunction(options);
    let hierarchy: NodeData = {} as NodeData;
    const tOrder: string[] = findTopologicalSortDFS() // To get the topological order of the nodes

    const rootId = tOrder[0]; // Assume: there is only one root
    generateStructForFlextree(hierarchy, rootId)

    const tree = layout.hierarchy(hierarchy);
    layout(tree);

    tree.each(node => {
        const x = node.x;
        const y = node.y;

        const reactFlowNode = nodes.find(n => n.id === node.data.id);
        if (reactFlowNode) {
            if (reactFlowNode.position.x !== 0 && reactFlowNode.position.y !== 0) {
                reactFlowNode.position = {
                    x: x > reactFlowNode.position.x ? x : reactFlowNode.position.x,
                    y: y > reactFlowNode.position.y ? y : reactFlowNode.position.y
                };
            } else {
                reactFlowNode.position = { x, y };
            }

            // Adjust for unordered group node (width not fix)
            if (reactFlowNode.type === 'unorderedGroupNode') {
                reactFlowNode.position.x -= nodeWidth / 2;
                reactFlowNode.position.y -= nodeHeight / 2;
            }
            // console.log(reactFlowNode.id + " --> " + reactFlowNode.position.x + " " + reactFlowNode.position.y)

        }
    });

    return { lNode: nodes, lEdge: edges };
}

export default function D3FlexTree() {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    let { lNode, lEdge } = calculateLayoutNodes(initialNodes, initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode, unorderedGroupNode: UnorderedGroupNode }), []);

    return (
        <div style={{ width: 'auto', height: '100vh', overflowX: 'auto', overscrollBehaviorY: 'none', backgroundColor: 'white' }}>
            <h1 style={{textAlign: 'center', backgroundColor: 'pink' }}> D3FlexTree </h1>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                nodeTypes={nodeTypes}
                panOnDrag={false}
                panOnScroll={true}
                // panOnScrollMode={PanOnScrollMode.Vertical}
                maxZoom={1}
                minZoom={1}
            >
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </div>
    );
}