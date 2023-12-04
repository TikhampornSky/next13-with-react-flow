import { Edge, MarkerType } from "reactflow";
const Edges: Edge[] = [
    { id: 'a1-a2', source: 'A-1', target: 'A-2', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'a2-b', source: 'A-2', target: 'B', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'a2-c', source: 'A-2', target: 'C', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'b1-b2', source: 'B-1', target: 'B-2', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: 'b1-b3', source: 'B-1', target: 'B-3', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: "c-c1", source: 'C', target: 'C-1', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
    { id: "c-c2", source: 'C', target: 'C-2', style: { stroke: 'black' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } }
];

export default Edges;