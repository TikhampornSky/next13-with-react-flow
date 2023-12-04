import { MarkerType, Node } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes: Node<any, string | undefined>[] = [
    // {
    //     id: '1',
    //     // type: 'input',
    //     data: { label: 'root' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '2',
    //     data: { label: 'node 2' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '2a',
    //     data: { label: 'node 2a' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '2b',
    //     data: { label: 'node 2b' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '2c',
    //     data: { label: 'node 2c' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '2d',
    //     data: { label: 'node 2d' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '3',
    //     data: { label: 'node 3' },
    //     draggable: false,
    //     position,
    // },
    {
        id: 'group-1',
        type: 'group',
        data: { label: 'group-11' },
        position,
        draggable: false
    },
    {
        id: '4',
        data: { label: 'node 4' },
        draggable: false,
        position,
        parentNode: 'group-1',
        extent: 'parent',
    },
    {
        id: '5',
        data: { label: 'node 5' },
        draggable: false,
        position,
        parentNode: 'group-1',
        extent: 'parent',
    },
    // {
    //     id: '6',
    //     // type: 'output',
    //     data: { label: 'output' },
    //     draggable: false,
    //     position,
    // },
    // {
    //     id: '7', 
    //     // type: 'output',
    //     data: { label: 'output' },
    //     draggable: false,
    //     position
    // },
];

export const initialEdges = [
    // { id: 'e12', source: '1', target: '2', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e13', source: '1', target: '3', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e22a', source: '2', target: '2a', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e22b', source: '2', target: '2b', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e22c', source: '2', target: '2c', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e45', source: '4', target: '5', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e56', source: 'group-1', target: '6', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    // { id: 'e57', source: 'group-1', target: '7', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
];
