import { Handle, Position } from 'reactflow';
import { IMicroNode } from '../data';
import { groupMember } from '../node-edges';
import { defaultSettings } from '../setting';

export default function OrderedGroupNode({ id, data, isConnectable }: { id: string, data: { label: string }, isConnectable: boolean }) {
    let member: IMicroNode[] = groupMember.get(id)?.members || [];
    return (
        <div style={{width: 'fit-content'}}>
            <p style={{ backgroundColor: 'transparent', textAlign: 'left', position: 'absolute', top: '-20px' }}> {data.label} </p>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div style={{backgroundColor: 'red'}}>
                {member.map((value, index) => {
                    return <div style={{ backgroundColor: '#ffe5d1', marginBottom: `${index !== member.length - 1 ? '5px' : ''}`, width: `${defaultSettings.nodeWidth}px`, height: `${defaultSettings.nodeHeight}px` }} key={value.id}> {value.name}</div>
                })}
            </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}