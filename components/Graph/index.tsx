"use client"

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Panel,
  Node,
  NodeSelectionChange,
  EdgeSelectionChange,
  PanOnScrollMode
} from "reactflow";
import 'reactflow/dist/style.css';
import CustomNode from "./CustomNode";
import NavBar from "../Nav";
import Edges from "./Edge";
import { DialogProps, FlowProps, MockDetailInterface } from "@/types";
import CustomizedDialogs from "./NodeDialog";
import { fetchMockDataDetailsById } from "@/backend";

const nodeTypes = {
  custom: CustomNode
};

const BasicFlow = ({ data }: FlowProps) => {
  const [nodes, , onNodesChange] = useNodesState(data);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onNodeMouseEnterAndLeave = (event: React.MouseEvent, node: Node) => {
    let ns: NodeSelectionChange[] = []
    let es: EdgeSelectionChange[] = []

    nodes.map((nodee) => {
      if (nodee.id === node.id) {
        if (event.type === 'mouseenter') {
          nodee.style = {
            ...nodee.style,
            backgroundColor: 'rgba(237, 29, 27, 0.28)',
            borderColor: 'rgba(255, 4, 11, 0.57)',
            borderWidth: 2,
          };
        } else {
          nodee.style = {
            ...nodee.style,
            backgroundColor: 'rgba(53, 188, 237, 0.34)',
            borderColor: 'rgba(53, 188, 237, 1)',
            borderWidth: 2,
          }
        }
        ns.push({
          id: nodee.id,
          type: 'select',
          selected: true,
        })
      }
      return nodee;
    });
    edges.map((edge) => {
      if (edge.source === node.id) {
        if (event.type === 'mouseenter') {
          edge.animated = true;
          edge.style = { stroke: 'red' };
        } else {
          edge.animated = false;
          edge.style = { stroke: 'black' };
        }
        es.push({
          id: edge.id,
          type: 'select',
          selected: true,
        })
      }
      return edge;
    });

    onNodesChange(ns);
    onEdgesChange(es);
  }

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState<MockDetailInterface>({} as MockDetailInterface);
  const onNodeClick = async (event: React.MouseEvent, node: Node) => {
    if (node.type === 'group' || node.type === 'output') return;
    setOpen(true);
    setTitle(node.data.label);
    const randomNumber = Math.floor(Math.random() * 500) + 1;  // mock id for fake api
    const mockDetails = await fetchMockDataDetailsById(randomNumber.toString())
    setDetail(mockDetails);
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnterAndLeave}
        onNodeMouseLeave={onNodeMouseEnterAndLeave}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        // fitView
        attributionPosition="top-right"

        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        panOnDrag={false}
        panOnScroll={true}

        panOnScrollMode={PanOnScrollMode.Free}
        // fitView
        maxZoom={1}
        minZoom={1}
        translateExtent={[
          [-574, 0],
          [932, 2000],
        ]}
      >
        <Panel position="top-left">
          <NavBar />
        </Panel>
        <Controls />
        <MiniMap />
        <Background gap={20} size={1} />
      </ReactFlow>
      <CustomizedDialogs open={open} setOpen={setOpen} title={title} detail={detail} setTitle={setTitle} setDetail={setDetail} />
    </div>
  );
};

export default BasicFlow;