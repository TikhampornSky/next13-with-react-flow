import { Handle, Position } from 'reactflow';
import { groupMember } from './node-edges';
import { IMicroNode } from './data';

function GroupNode({ id, data, isConnectable }: { id: string, data: string, isConnectable: boolean }) {
    let member: IMicroNode[] = groupMember.get(id)?.members || [];
    return (
        <div style={{ backgroundColor: 'red', padding: '10px' }}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            {member.map((value) => {
                return <div style={{ backgroundColor: '#ffe5d1', padding: '10px', width: '172px', marginBottom: '10px' }} key={value.id}> {value.name}</div>
            })}
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default GroupNode;