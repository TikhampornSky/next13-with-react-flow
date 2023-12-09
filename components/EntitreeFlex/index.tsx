"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant } from "reactflow";
import { layoutFromMap } from "entitree-flex";
import { getInitialNodesAndEdges, groupMember, parents } from './node-edges';
import { findTopologicalSortDFS } from "./algorithm";
import { gapBetweenNodeInHorizontal, gapBetweenNodeInVertical, nodeHeight, nodeWidth } from "./constant";
import { GroupType } from "./data";
import { defaultSettings } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";

interface TreeNode {
    name: string;
    width?: number;
    height?: number;
    children?: string[];
    spouses?: string[];
    parents?: string[];
}

interface NodeData {
    [key: string]: TreeNode;
}

function calculateNodeSize(nodeId: string): [number, number] {
    const nodeInfo = groupMember.get(nodeId)
    if (!nodeInfo) {
        return [nodeWidth, nodeHeight]
    }
    let memberCount = nodeInfo.members.length; 
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
    return [w + gapBetweenNodeInHorizontal, h + gapBetweenNodeInVertical];
}

function generateStructForFlextree(hierarchy: NodeData, nodes: Node<any, string | undefined>[]) {
    nodes.forEach((node) => {
        let sizee = calculateNodeSize(node.id!)
        let p = parents.get(node.id!)
        let myParents: string[] = []
        p && p.forEach((value) => {
            myParents.push(value)
        })

        hierarchy[node.id!] = {
            name: node.data.label,
            width: sizee[0],
            height: sizee[1],
            children: groupMember.get(node.id!)?.next || [],
            spouses: [],
            parents: myParents, 
        }
    })
}

function calculateLayoutNodes(reactFlownodes: Node<any, string | undefined>[], edges: Edge<any>[]) {
    let hierarchy: NodeData = {} as NodeData;
    const tOrder: string[] = findTopologicalSortDFS() // To get the topological order of the nodes

    const rootId = tOrder[0]; // Assume: there is only one root
    generateStructForFlextree(hierarchy, reactFlownodes)

    const { map, maxBottom, maxLeft, maxRight, maxTop, nodes, rels } = layoutFromMap(rootId, hierarchy, defaultSettings);
    nodes.forEach((node) => {
        const reactFlowNode = reactFlownodes.find((value) => value.data.label === node.name)
        if (reactFlowNode) {
            reactFlowNode.position = { x: node.x, y: node.y }
        }
    })

    return { lNode: reactFlownodes, lEdge: edges };
}

export default function EntitreeTree() {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    let { lNode, lEdge } = calculateLayoutNodes(initialNodes, initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode, unorderedGroupNode: UnorderedGroupNode }), []);

    return (
        <div style={{ width: '100wh', height: '100vh', overflowX: 'auto', overscrollBehaviorY: 'none', backgroundColor: 'white' }}>
        <h1 style={{textAlign: 'center', backgroundColor: 'pink' }}> EntitreeFlex </h1>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            nodeTypes={nodeTypes}
            // panOnDrag={false}
            // panOnScroll={true}
            // // panOnScrollMode={PanOnScrollMode.Vertical}
            // maxZoom={1}
            // minZoom={1}
        >
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
    </div>
    );
}