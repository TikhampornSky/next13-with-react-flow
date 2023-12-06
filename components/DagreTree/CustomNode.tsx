import { Handle, Position } from 'reactflow';

function GroupNode({ data, isConnectable }: {data: string, isConnectable: boolean}) {
  return (
    <div style={{backgroundColor: 'red', padding: '10px'}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div style={{backgroundColor: 'blue', padding: '5px', margin: '5px'}}>
        <p> Member 1 </p>
      </div>
      <div style={{backgroundColor: 'blue', padding: '5px', margin: '5px'}}>
        <p> Member 2 </p>
      </div>
      <div style={{backgroundColor: 'blue', padding: '5px', margin: '5px'}}>
        <p> Member 3 </p>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default GroupNode;