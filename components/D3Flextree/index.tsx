"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge } from "reactflow";
import GroupNode from "./CustomNode";
import { flextree, FlextreeOptions } from 'd3-flextree';
import { initialNodes, initialEdges, groupMember } from './node-edges';

const nodeWidth = 172;
const nodeHeight = 36;

interface NodeData {
    id: string;
    children?: NodeData[];
    size?: [number, number]; // [width, height]
}

const options: FlextreeOptions<NodeData> = {
    nodeSize: (node) => {
        return [node.data.id.length * 10, 20];
    },
    spacing: 20,
    children: (node) => {
        return node.children;
    }
};

function calculateNodeSize(node: Node<any, string | undefined>) {
    let result = [nodeWidth, nodeHeight];
    if (node.type === 'groupNode') {
        let h = groupMember.get(node.id)?.length || 1;
        return [nodeWidth, nodeHeight*h];
    }
    return result;
}

function generateStructForFlextree(nodes: Node<any, string | undefined>[]) {
    let struct: NodeData = {} as NodeData;
    // TODO: generate struct for flextree
    return struct;
}

function calculateLayoutNodes(nodes: Node<any, string | undefined>[], edges: Edge<any>[]) {
    const flextree2 = flextree;
    const layout = flextree2(options);
    const tree = layout.hierarchy({
        id: 'root',
        size: [1, 1],
        children: [
            {
                id: 'a',
                size: [2, 4]
            },
            {
                id: 'b',
                size: [3, 1],
                children: [
                    { 
                        id: 'c',
                        size: [4, 1] 
                    },
                ],
            },
        ],
    });
    layout(tree);
    tree.each(node => console.log(`${node.data.id} ==> (${node.x}, ${node.y})`));

    return { nodes, edges };
}

export default function D3FlexTree() {
    const { nodes: layoutedNodes, edges: layoutedEdges } = calculateLayoutNodes(initialNodes, initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    const nodeTypes = useMemo(() => ({ groupNode: GroupNode }), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <h1> D3FlexTree </h1>
            {/* <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                nodeTypes={nodeTypes}
            >
            </ReactFlow> */}
        </div>
    );
}