import { Node } from "reactflow";

const Nodes:Node[] = [
    {
      id: 'A',
      type: 'group',
      data: null,
      position: { x: 0, y: 0 },
      style: {
        width: 170,
        height: 140,
      },
    },
    {
      id: 'A-1',
      type: 'input',
      data: { label: 'Node A-1' },
      position: { x: 10, y: 10 },
      parentNode: 'A',
      extent: 'parent',
      style: {
        backgroundColor: 'rgba(53, 188, 237, 0.34)',
        borderColor: 'rgba(53, 188, 237, 1)',
        borderWidth: 2,
      }
    },
    {
      id: 'A-2',
      data: { label: 'Node A-2' },
      position: { x: 10, y: 90 },
      parentNode: 'A',
      extent: 'parent',
    },
    {
      id: 'B',
      type: 'output',    // can use like this too
      position: { x: -100, y: 200 },
      data: null,
      style: {
        width: 170,
        height: 160,
        backgroundColor: 'rgba(53, 188, 237, 0.34)',
      },
    },
    {
      id: 'B-1',
      data: { label: 'Node B-1' },
      position: { x: 50, y: 10 },
      parentNode: 'B',
      extent: 'parent',
      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'B-2',
      data: { label: 'Node B-2' },
      position: { x: 10, y: 90 },
      parentNode: 'B',
      extent: 'parent',
      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'B-3',
      data: { label: 'Node B-3' },
      position: { x: 100, y: 90 },
      parentNode: 'B',
      extent: 'parent',
      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'C',          // ungroup node
      position: { x: 100, y: 200 },
      data: { label: 'Node C' },
    },
    { 
        id: "C-1", 
        position: { x: 0, y: 100 },  // relative to parent (because of 'parentNode')
        parentNode: 'C',
        data: { label: "Node C-1" }, 
    },
    {   
        id: "C-2", 
        position: { x: 200, y: 100 } ,
        parentNode: 'C',
        data: { label: "Node C-2" },
    },
    {
        id: "4",
        type: "custom",
        data: { label: "Custom Node" },
        position: { x: 400, y: 200 }
    }
  ];
  
  export default Nodes;