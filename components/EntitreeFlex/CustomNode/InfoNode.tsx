import { Handle, Position } from 'reactflow';
import { defaultSettings } from '../setting';

export default function InfoNode({ id, data, isConnectable }: { id: string, data: {label: string}, isConnectable: boolean }) {
    return (
        <div style={{ backgroundColor: 'red', width: 'fit-content' }}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div style={{ backgroundColor: '#f2c9ff', width: `${defaultSettings.nodeWidth}px`, height: `${defaultSettings.nodeHeight}px`, marginBottom: '' }} key={id}> {data.label} </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}