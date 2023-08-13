"use client"

import { useCallback } from "react";
import ReactFlow, {
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
import Nodes from "./Node";
import Edges from "./Edge";

  
const nodeTypes = {
  custom: CustomNode
};

const BasicFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(Nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);
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
              attributionPosition="top-right"
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