"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge } from "reactflow";
import { flextree, FlextreeOptions } from 'd3-flextree';
import { getInitialNodesAndEdges, groupMember } from './node-edges';
import { findTopologicalSortDFS } from "./algorithm";
import SingleNode from "./CustomNode/SingleNode";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import { gapBetweenNodeInVertical, nodeHeight, nodeWidth } from "./constant";

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
    spacing: 200,
    children: (node) => {
        return node.children;
    }
};

function calculateNodeSize(nodeId: string): [number, number] {
    let h = groupMember.get(nodeId)?.members.length || 1;  // TODO: Handle in the case group of unordered
    return [nodeWidth, (nodeHeight * h) + gapBetweenNodeInVertical];
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
        console.log(node.data.id, " --> ", x + " " + y);
        if (reactFlowNode) {
            if (reactFlowNode.position.x !== 0 && reactFlowNode.position.y !== 0) {
                reactFlowNode.position = {
                    x: x > reactFlowNode.position.x ? x : reactFlowNode.position.x,
                    y: y > reactFlowNode.position.y ? y : reactFlowNode.position.y
                };
            } else {
                reactFlowNode.position = { x, y };
            }
        }
    });


    return { lNode: nodes, lEdge: edges };
}

export default function D3FlexTree() {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    let { lNode, lEdge } = calculateLayoutNodes(initialNodes, initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode }), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <h1> D3FlexTree </h1>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                nodeTypes={nodeTypes}
            >
            </ReactFlow>
        </div>
    );
}