"use client"
import { useMemo, useEffect, Dispatch, SetStateAction } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant, PanOnScrollMode, getNodesBounds, useReactFlow, Rect } from "reactflow";
import { layoutFromMap } from "entitree-flex";
import { getInitialNodesAndEdges, groupMember, parents } from './node-edges';
import { GroupType } from "./data";
import { defaultSettings, horizontalMargin, verticalMargin } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
import InfoNode from "./CustomNode/InfoNode";
import { findRoot } from "./algorithm";

interface TreeNode {
    name: string;
    width?: number;
    height?: number;
    children?: string[];
    spouses?: string[];
    parents?: string[];
}

interface NodeData {
    [key: string]: TreeNode;
}

function calculateNodeSize(nodeId: string): [number, number] {
    let nodeWidth = defaultSettings.nodeWidth;
    let nodeHeight = defaultSettings.nodeHeight;
    const nodeInfo = groupMember.get(nodeId)
    if (!nodeInfo) {
        return [nodeWidth, nodeHeight]
    }
    let memberCount = nodeInfo.members.length;
    let w, h;
    if (nodeInfo.type === GroupType.Unordered) {
        w = (nodeWidth * memberCount) + (horizontalMargin * (memberCount - 1));
        h = nodeHeight;
    } else if (nodeInfo.type === GroupType.Ordered) {
        w = nodeWidth;
        h = (nodeHeight * memberCount) + (verticalMargin * (memberCount - 1));
    } else {
        w = nodeWidth;
        h = nodeHeight;
    }
    return [w, h];
}

function generateStructForFlextree(hierarchy: NodeData, nodes: Node<any, string | undefined>[]) {
    nodes.forEach((node) => {
        let sizee = calculateNodeSize(node.id!)
        let p = parents.get(node.id!)
        let myParents: string[] = []
        p && p.forEach((value) => {
            myParents.push(value)
        })

        hierarchy[node.id!] = {
            name: node.data.label,
            width: sizee[0],
            height: sizee[1],
            children: groupMember.get(node.id!)?.next || [],
            spouses: [],
            parents: myParents,
        }

    })
}

function calculateLayoutNodes(reactFlownodes: Node<any, string | undefined>[], edges: Edge<any>[], screenWidth: number) {
    let hierarchy: NodeData = {} as NodeData;
    const rootId: string = findRoot()

    generateStructForFlextree(hierarchy, reactFlownodes)

    let { nodes } = layoutFromMap(rootId, hierarchy, defaultSettings);
    let rootWidth = 0;
    nodes.forEach((node) => {
        const reactFlowNode = reactFlownodes.find((value) => value.data.label === node.name)
        if (reactFlowNode) {
            // reactFlowNode.data.label = reactFlowNode.id  // TEST ONLY

            reactFlowNode.position = {
                x: node.x,
                y: node.y
            } 
            // console.log(reactFlowNode.id + " --> " + JSON.stringify(reactFlowNode.position))

            if (reactFlowNode.id === rootId) {
                rootWidth = node.width
            }
        }
    })

    setInfoSection(reactFlownodes, screenWidth, rootWidth)

    return { lNode: reactFlownodes, lEdge: edges, rootInfo: { width: rootWidth } };
}

function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootWidth: number) {
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: - screenWidth/2 + rootWidth/2,
            y: 0
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}

interface EntitreeTreeProps {
    screenWidth: number;
    setScreenWidth: Dispatch<SetStateAction<number | null>>
}

export default function EntitreeTree({ screenWidth, setScreenWidth }: EntitreeTreeProps) {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    const { setViewport } = useReactFlow();
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode, 
        unorderedGroupNode: UnorderedGroupNode, infoNode: InfoNode }), []);

    let { lNode, lEdge, rootInfo } = calculateLayoutNodes(initialNodes, initialEdges, screenWidth);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const bounds = getNodesBounds(nodes);
    
    useEffect(() => {
        setViewport({
            x: defaultSettings.rootX + ( screenWidth === null ? 0 : screenWidth / 2) - ( rootInfo.width / 2),
            y: 0,
            zoom: 1
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
                maxZoom={1}
                minZoom={1}
                translateExtent={[
                    [bounds.x, bounds.y],
                    [bounds.x + bounds.width, bounds.y + bounds.height]
                ]}
                // onlyRenderVisibleElements={true}

                onInit={() => {
                    setViewport({
                      x: defaultSettings.rootX + ( screenWidth === null ? 0 : screenWidth / 2) - ( rootInfo.width / 2),
                      y: 0,
                      zoom: 1
                    });
                }}
            >
                <MiniMap pannable={true} />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </>
    );
}