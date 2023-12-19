import { Handle, Position } from 'reactflow';
import { IMicroNode } from '../data';
import { groupMember } from '../node-edges';
import { defaultSettings } from '../setting';

export default function UnorderedGroupNode({ id, data, isConnectable }: { id: string, data: { label: string }, isConnectable: boolean }) {
    let member: IMicroNode[] = groupMember.get(id)?.members || [];
    return (
        <div style={{ backgroundColor: 'blue', display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content' }}>
            <p style={{ backgroundColor: 'transparent', textAlign: 'left', position: 'absolute', top: '-20px' }}> {data.label} </p>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div style={{backgroundColor: 'red', display: 'flex', flexDirection: 'row'}}>
                {member.map((value, index) => {
                    return <div style={{ backgroundColor: '#ffabdc', marginRight: `${index !== member.length - 1 ? '5px' : ''}`, width: `${defaultSettings.nodeWidth}px`, height: `${defaultSettings.nodeHeight}px` }} key={value.id}> {value.name}</div>
                })}
            </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
    // return (
    //     <div style={{ backgroundColor: 'blue', alignItems: 'center', minWidth: `688px`, minHeight: `${nodeHeight}px` }}>
    //         <p style={{ backgroundColor: 'transparent', textAlign: 'left', position: 'absolute', top: '-20px' }}> {data.label} </p>
    //         <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
    //         <div style={{backgroundColor: 'red'}}>
    //             {member.map((value) => {
    //                 return <div style={{ backgroundColor: '#ffabdc', marginRight: '5px' }} key={value.id}> {value.name}</div>
    //             })}
    //         </div>
    //         <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    //     </div>
    // );
}