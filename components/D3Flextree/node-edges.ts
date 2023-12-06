import { MarkerType, Node } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = 'default';

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
        id: '2a-1',
        data: { label: 'node 2a-1' },
        position,
        draggable: false,
    },
    {
        id: '2a-2',
        data: { label: 'node 2a-2' },
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
        draggable: false,
    },
    {
        id: '3',
        data: { label: 'node 3' },
        position,
        draggable: false,
    },
    {
        id: '4',
        data: { label: 'node 4' },
        position,
        draggable: false,
    },
    {
        id: '5',
        data: { label: 'node 5' },
        position,
        draggable: false,
        type: 'groupNode'
    },
    {
        id: '2e',
        data: { label: 'node 2e' },
        position,
        // draggable: false,
        type: 'groupNode'
    },
    {
        id: '2f',
        data: { label: 'node 2f' },
        position,
        // draggable: false,
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
    { id: 'e34', source: '3', target: '4', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e45', source: '4', target: '5', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2a12a-1', source: '2a', target: '2a-1', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2a12a-2', source: '2a', target: '2a-2', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2d2e', source: '2d', target: '2e', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'e2d2f', source: '2d', target: '2f', type: edgeType, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
];

export let groupMember = new Map<string, string[]>() // key: group node id, value: member node id (May be node interface)
groupMember.set('2c', ['2c-1', '2c-2', '2c-3', '2c-4', '2c-5', '2c-6'])
groupMember.set('5', ['5-1', '5-2', '5-3'])
groupMember.set('2e', ['2e-1'])