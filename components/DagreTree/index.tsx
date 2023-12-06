"use client"
import React, { useMemo } from 'react';
import ReactFlow, {
    ConnectionLineType,
    useNodesState,
    useEdgesState,
    Edge,
    Node,
    Position
} from 'reactflow';
import dagre from 'dagre';

import { initialNodes, initialEdges } from './node-edges';

import 'reactflow/dist/style.css';
import GroupNode from "./CustomNode";

const dagreGraph = new dagre.graphlib.Graph({ compound: true });
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node<any, string | undefined>[], edges: Edge<any>[], direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        if (node.type === 'groupNode') {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: 200 });
        } else {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });    
        }
        
        if (node.parentNode) {
            dagreGraph.setParent(node.id, node.parentNode);
        }
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = Position.Top;
        node.sourcePosition = Position.Bottom;

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        

        return node;
    });

    // // Check position
    // nodes.forEach((node) => {
    //     const nodeWithPosition = dagreGraph.node(node.id);
    //     console.log(node.id, " --> React-Flow Position: ", node.position, " Dagre Position: ", nodeWithPosition);
    // })

    return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
);

const LayoutFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    const nodeTypes = useMemo(() => ({ groupNode: GroupNode }), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
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
};

export default LayoutFlow;