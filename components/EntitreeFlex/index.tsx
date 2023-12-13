"use client"
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant, PanOnScrollMode, Controls } from "reactflow";
import { layoutFromMap } from "entitree-flex";
import { getInitialNodesAndEdges, groupMember, parents } from './node-edges';
import { GroupType } from "./data";
import { defaultSettings, horizontalMargin, verticalMargin, minimapWidth } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
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

function calculateLayoutNodes(reactFlownodes: Node<any, string | undefined>[], edges: Edge<any>[]) {
    let hierarchy: NodeData = {} as NodeData;
    const rootId: string = findRoot()

    generateStructForFlextree(hierarchy, reactFlownodes)

    let { maxBottom, maxLeft, maxRight, maxTop, nodes } = layoutFromMap(rootId, hierarchy, defaultSettings);
    nodes.forEach((node) => {
        const reactFlowNode = reactFlownodes.find((value) => value.data.label === node.name)
        if (reactFlowNode) {
            reactFlowNode.data.label = reactFlowNode.id  // TEST ONLY

            reactFlowNode.position = { x: node.x, y: node.y }
            console.log(reactFlowNode.id + " --> " + JSON.stringify(reactFlowNode.position))
        }
    })

    return { lNode: reactFlownodes, lEdge: edges, maxCoordinate: { maxBottom, maxLeft, maxRight, maxTop } };
}

export default function EntitreeTree() {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    let { lNode, lEdge, maxCoordinate } = calculateLayoutNodes(initialNodes, initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const nodeTypes = useMemo(() => ({ orderedGroupNode: OrderedGroupNode, singleNode: SingleNode, unorderedGroupNode: UnorderedGroupNode }), []);
    
    console.log("maxCoordinate: " + JSON.stringify(maxCoordinate))
    return (
        <>
            {/* <h1 style={{textAlign: 'center', backgroundColor: 'pink' }}> EntitreeFlex </h1> */}
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
                // fitView
                maxZoom={1}
                minZoom={1}
                translateExtent={[
                    [maxCoordinate.maxLeft - 100, maxCoordinate.maxTop],
                    [maxCoordinate.maxRight, maxCoordinate.maxBottom],
                ]}
                onlyRenderVisibleElements={true}
                // defaultViewport={{ x: 630, y: 0, zoom: 1 }}
            >
                <MiniMap pannable={true} />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </>
    );
}