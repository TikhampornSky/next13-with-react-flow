"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge } from "reactflow";
import GroupNode from "./CustomNode";
import { flextree, FlextreeOptions } from 'd3-flextree';
import { getInitialNodesAndEdges, groupMember } from './node-edges';
import { findTopologicalSortDFS } from "./algorithm";

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

function calculateNodeSize(nodeId: string): [number, number] {
    let h = groupMember.get(nodeId)?.members.length || 1;
    return [nodeWidth, nodeHeight * h];
}

function recur(id: string, hierarchyChildren: NodeData[]) {
    let s: NodeData = {} as NodeData;
    s.id = id
    s.size = calculateNodeSize(id);
    s.children = [];
    hierarchyChildren.push(s);
    
    const neighborIds = groupMember.get(id)?.next || [];
    for (let i = 0; i < neighborIds.length; i++) {
        const neighborId = neighborIds[i];
        recur(neighborId, s.children);
    }
}

function generateStructForFlextree(hierarchy: NodeData) {
    const tOrder: string[] = findTopologicalSortDFS() // To get the topological order of the nodes

    const rootId = tOrder[0]; // Assume: there is only one root
    hierarchy.id = rootId;
    hierarchy.size = calculateNodeSize(rootId);
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
    generateStructForFlextree(hierarchy)

    console.log("My Hierarchy: ", hierarchy)
    // const tree = layout.hierarchy(hierarchy);
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
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
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