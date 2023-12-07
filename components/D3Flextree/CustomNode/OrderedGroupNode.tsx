import { Handle, Position } from 'reactflow';
import { IMicroNode } from '../data';
import { groupMember } from '../node-edges';

export default function OrderedGroupNode({ id, data, isConnectable }: { id: string, data: {label: string}, isConnectable: boolean }) {
    let member: IMicroNode[] = groupMember.get(id)?.members || [];
    return (
        <div style={{ backgroundColor: 'red'}}>
            {/* <p> {data.label} </p> */}
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            {member.map((value) => {
                return <div style={{ backgroundColor: '#ffe5d1', width: '172px', marginBottom: '' }} key={value.id}> {value.name}</div>
            })}
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}