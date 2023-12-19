"use client"
import { useMemo, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant, PanOnScrollMode, getNodesBounds, useReactFlow } from "reactflow";
import { getInitialNodesAndEdges } from './node-edges';
import { defaultSettings, zoomLevel } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
import InfoNode from "./CustomNode/InfoNode";
import { calculateLayoutNodes, setInfoSection } from "./lib/EntitreeFlex";   // Change this to use another lib

interface EntitreeTreeProps {
    screenWidth: number;
    screenHeight: number;
}

export default function EntitreeTree({ screenWidth, screenHeight }: EntitreeTreeProps) {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    const { setViewport } = useReactFlow();
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode, 
        unorderedGroupNode: UnorderedGroupNode, infoNode: InfoNode }), []);

    let { lNode, lEdge, rootInfo } = calculateLayoutNodes(initialNodes, initialEdges, screenWidth);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    
    const bounds = getNodesBounds(nodes);
    if (bounds.height < screenHeight) {
        bounds.height = screenHeight
    }
    // console.log("bounds: " + JSON.stringify(bounds))

    // const { x, y, zoom } = getViewportForBounds(bounds, screenWidth, screenHeight, zoomLevel, zoomLevel);
    // console.log("x: " + x + ", y: " + y + ", zoom: " + zoom)

    // const { x, y, zoom } = useViewport();
    // console.log("x: " + x + ", y: " + y + ", zoom: " + zoom)
    
    useEffect(() => {
        setViewport({
            x: defaultSettings.rootX + ( screenWidth / 2) - ( rootInfo.width / 2),
            y: 0,
            zoom: zoomLevel
        });
        setInfoSection(nodes, screenWidth, rootInfo.width)
    }, [screenWidth]);

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineType={ConnectionLineType.SmoothStep}
                nodeTypes={nodeTypes}

                zoomOnScroll={false}
                zoomOnDoubleClick={false}
                selectNodesOnDrag={false}
                panOnDrag={false}
                panOnScroll={true}

                panOnScrollMode={PanOnScrollMode.Free}
                fitView
                // fitViewOptions={{ nodes: nodes }}
                maxZoom={zoomLevel}
                minZoom={zoomLevel}
                translateExtent={[
                    [bounds.x, bounds.y],
                    [bounds.x + bounds.width, bounds.y + bounds.height]
                ]}
                // onlyRenderVisibleElements={true}

                onInit={() => {
                    setViewport({
                      x: defaultSettings.rootX + ( screenWidth / 2) - ( rootInfo.width / 2),
                      y: 0,
                      zoom: zoomLevel
                    });
                }}
            >
                <MiniMap pannable={true} />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </>
    );
}