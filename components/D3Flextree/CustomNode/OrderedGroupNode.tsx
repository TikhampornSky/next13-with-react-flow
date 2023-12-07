import { Handle, Position } from 'reactflow';
import { IMicroNode } from '../data';
import { groupMember } from '../node-edges';
import { nodeHeight, nodeWidth } from '../constant';

export default function OrderedGroupNode({ id, data, isConnectable }: { id: string, data: { label: string }, isConnectable: boolean }) {
    let member: IMicroNode[] = groupMember.get(id)?.members || [];
    return (
        <div>
            <p style={{ backgroundColor: 'transparent', textAlign: 'left', position: 'absolute', top: '-20px' }}> {data.label} </p>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div style={{backgroundColor: 'red'}}>
                {member.map((value) => {
                    return <div style={{ backgroundColor: '#ffe5d1', width: `${nodeWidth}px`, height: `${nodeHeight}px` }} key={value.id}> {value.name}</div>
                })}
            </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}