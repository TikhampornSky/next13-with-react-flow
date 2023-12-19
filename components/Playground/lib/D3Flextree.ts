import { nodeWidth, nodeHeight } from "@/components/D3Flextree/constant";
import { GroupType } from "../data";
import { groupMember } from "../node-edges";
import { Node, Edge } from "reactflow";
import { flextree, FlextreeOptions } from 'd3-flextree';
import { findRoot } from "../algorithm";
import { defaultSettings, horizontalMargin, verticalMargin } from "../setting";

interface NodeData {
    id: string;
    children?: NodeData[];
    size?: [number, number]; // [width, height]
}

const gapBetweenNodeInVertical = 50;
const gapBetweenNodeInHorizontal = 50;

const options: FlextreeOptions<NodeData> = {
    nodeSize: (node) => {
        let sizee = calculateNodeSize(node.data.id!)
        return sizee;
    },
    spacing: 100,
    children: (node) => {
        return node.children;
    }
};

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
    return [w, h + gapBetweenNodeInVertical];
}

function recur(id: string, hierarchyChildren: NodeData[]) {
    let s: NodeData = {} as NodeData;
    s.id = id
    s.children = [];
    hierarchyChildren.push(s);

    const neighborIds = groupMember.get(id)?.next || [];
    for (let i = 0; i < neighborIds.length; i++) {
        const neighborId = neighborIds[i];
        recur(neighborId, s.children);
    }
}

function generateStructForFlextree(hierarchy: NodeData, rootId: string) {
    hierarchy.id = rootId;
    hierarchy.children = [];

    const neighborIds = groupMember.get(rootId)?.next || [];
    for (let i = 0; i < neighborIds.length; i++) {
        const neighborId = neighborIds[i];
        recur(neighborId, hierarchy.children);
    }

    return hierarchy;
}

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootWidth: number) {
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: { x: screenWidth - rootWidth, y: 0 },
        data: { label: 'Info' }
    })
}

export function calculateLayoutNodes(nodes: Node<any, string | undefined>[], edges: Edge<any>[], screenWidth: number) {
    const flextreeFunction = flextree;
    const layout = flextreeFunction(options);
    let hierarchy: NodeData = {} as NodeData;
    const rootId: string = findRoot()

    generateStructForFlextree(hierarchy, rootId)

    const tree = layout.hierarchy(hierarchy);
    layout(tree);

    let rootWidth = 0;
    tree.each(node => {
        const x = node.x;
        const y = node.y;

        const reactFlowNode = nodes.find(n => n.id === node.data.id);
        if (reactFlowNode) {
            if (reactFlowNode.position.x !== 0 && reactFlowNode.position.y !== 0) {
                reactFlowNode.position = {
                    x: x > reactFlowNode.position.x ? x : reactFlowNode.position.x,
                    y: y > reactFlowNode.position.y ? y : reactFlowNode.position.y
                };
            } else {
                reactFlowNode.position = { x, y };
            }

            // Adjust for unordered group node (width not fix)
            // if (reactFlowNode.type === 'unorderedGroupNode') {
            //     reactFlowNode.position.x -= nodeWidth / 2;
            //     reactFlowNode.position.y -= nodeHeight / 2;
            // }
            reactFlowNode.data.label = reactFlowNode.id + " - " + reactFlowNode.data.label

            if (reactFlowNode.id === rootId) {
                rootWidth = node.size[0];
            }
            // console.log(reactFlowNode.id + " --> " + reactFlowNode.position.x + " " + reactFlowNode.position.y)

        }
    });

    // setInfoSection(nodes, screenWidth, rootWidth)

    return { lNode: nodes, lEdge: edges, rootInfo: { width: rootWidth } };
}