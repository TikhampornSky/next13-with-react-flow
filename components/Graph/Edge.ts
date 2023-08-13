import { Edge } from "reactflow";
const Edges: Edge[] = [
    { id: 'a1-a2', source: 'A-1', target: 'A-2' },
    { id: 'a2-b', source: 'A-2', target: 'B' },
    { id: 'a2-c', source: 'A-2', target: 'C' },
    { id: 'b1-b2', source: 'B-1', target: 'B-2' },
    { id: 'b1-b3', source: 'B-1', target: 'B-3' },
    { id: "c-c1", source: 'C', target: 'C-1', animated: true },
    { id: "c-c2", source: 'C', target: 'C-2' }
];

export default Edges;