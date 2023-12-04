import { initialNodes, initialEdges } from './node-edges';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
    Node,
    Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';

type customNodeType = Node<any, string | undefined>[] | ({
    id: string;
    type: string;
    data: {
        label: string;
    };
    position: {
        x: number;
        y: number;
    };
} | {
    id: string;
    data: {
        label: string;
    };
    position: {
        x: number;
        y: number;
    };
    type?: undefined;
})[]

type customEdgeType = Edge<any>[] | {
    id: string;
    source: string;
    target: string;
    type: string;
}[]

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes: customNodeType, edges: customEdgeType, options = {}) => {
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            // targetPosition: 'top',
            // sourcePosition: 'bottom',

            // Hardcode a width and height for elk to use when layouting.
            width: 150,
            height: 50,
        })),
        edges: edges.map((edge) => ({
            ...edge,
        })),
    };

    return elk
        .layout(graph)
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children.map((node) => ({
                ...node,
                // React Flow expects a position property on the node instead of `x`
                // and `y` fields.
                position: { x: node.x, y: node.y },
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
};

function LayoutFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { fitView } = useReactFlow();

    const onLayout = useCallback(
        ({ direction = 'DOWN', useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                window.requestAnimationFrame(() => fitView());
            });
        },
        [nodes, edges]
    );

    // Calculate the initial layout on mount.
    useLayoutEffect(() => {
        onLayout({ direction: 'DOWN', useInitialNodes: true });
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            {/* <Panel position="top-right">
                <button onClick={() => onLayout({ direction: 'DOWN' })}>vertical layout</button>

                <button onClick={() => onLayout({ direction: 'RIGHT' })}>horizontal layout</button>
            </Panel> */}
        </ReactFlow>
    );
}

export default () => (
    <ReactFlowProvider>
        <LayoutFlow />
    </ReactFlowProvider>
);