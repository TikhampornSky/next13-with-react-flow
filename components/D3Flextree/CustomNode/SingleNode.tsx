import { Handle, Position } from 'reactflow';

export default function SingleNode({ id, data, isConnectable }: { id: string, data: {label: string}, isConnectable: boolean }) {
    return (
        <div style={{ backgroundColor: 'red'}}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div style={{ backgroundColor: '#85ffdc', width: '172px', marginBottom: '' }} key={id}> {data.label} </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}