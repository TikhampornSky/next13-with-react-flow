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

import { initialNodes, initialEdges, ancestorNodes } from './node-edges';

import 'reactflow/dist/style.css';
import GroupNode from "./CustomNode";

const dagreGraph = new dagre.graphlib.Graph({ compound: true });
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const groupPadding = 10; // padding for the contents inside the group node
const groupMargin = 10; // margin for the contents inside the group node

const getLayoutedElements = (nodes: Node<any, string | undefined>[], edges: Edge<any>[], direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = Position.Top;
        node.sourcePosition = Position.Bottom;

        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        if (node.type === 'groupNode') {
            node.position.x -= groupPadding * 2
        }

        // Check if the parent node is a group node
        ancestorNodes.map((nextNode) => {
            if (nextNode.id === node.id) {
                node.position.x += (nodeWidth + (2*groupPadding)) / 2 ;
                node.position.y += ( ( nextNode.groupAncestorMemberCount ) * nodeHeight ) + (nextNode.groupAncestorMemberCount * groupMargin)
            }
        })
        // node.data.label = node.position.x + ", " + node.position.y;
        dagreGraph.setNode(node.id, { x: node.position.x, y: node.position.y });
        return node;
    });

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