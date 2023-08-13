"use client"

import { useCallback } from "react";
import ReactFlow, {
    Node,
    addEdge,
    Background,
    Edge,
    Connection,
    useNodesState,
    useEdgesState,
    Controls,
    MiniMap,
    Panel
} from "reactflow";
import 'reactflow/dist/style.css';
import CustomNode from "./CustomNode";
import NavBar from "../Nav/Navbar";

const initialNodes: Node[] = [
    {
      id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 }
    },
    { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
    { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
    {
      id: "4",
      type: "custom",
      data: { label: "Custom Node" },
      position: { x: 400, y: 200 }
    }
  ];
  
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" }
  ];
  
  const nodeTypes = {
    custom: CustomNode
  };
  
  const BasicFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
  
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
             <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
              <Panel position="top-left">
                <NavBar />
              </Panel>
              <Controls />
              <MiniMap />
              <Background gap={20} size={1} />
            </ReactFlow>
        </div>
    );
  };
  
  export default BasicFlow;