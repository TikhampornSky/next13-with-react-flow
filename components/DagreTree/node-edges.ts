import { MarkerType, Node } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes: Node<any, string | undefined>[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input' },
        position,
        draggable: false,
    },
    {
        id: '2',
        data: { label: 'node 2' },
        position,
        draggable: false,
    },
    {
        id: '2a',
        data: { label: 'node 2a' },
        position,
        draggable: false,
    },
    {
        id: '2b',
        data: { label: 'node 2b' },
        position,
        draggable: false,
    },
    {
        id: '2c',
        data: { label: 'node 2c' },
        position,
        draggable: false,
        type: 'groupNode'
    },
    {
        id: '2d',
        data: { label: 'node 2d' },
        position,
        // draggable: false,
    },
    {
        id: '3',
        data: { label: 'node 3' },
        position,
        draggable: false,
    },
];

export const initialEdges = [
    { id: 'e12', source: '1', target: '2', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e13', source: '1', target: '3', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e22a', source: '2', target: '2a', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e22b', source: '2', target: '2b', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e22c', source: '2', target: '2c', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2b2d', source: '2b', target: '2d', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
];