import { layoutFromMap } from "entitree-flex";
import { findRoot } from "../algorithm";
import { GroupType } from "../data";
import { groupMember, parents } from "../node-edges";
import { defaultSettings, horizontalMargin, verticalMargin } from "../setting";
import { Node, Edge } from "reactflow";

export interface TreeNode {
    name: string;
    width?: number;
    height?: number;
    children?: string[];
    spouses?: string[];
    siblings?: string[];
    parents?: string[];
}

export interface NodeData {
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

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootWidth: number) {
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

export function calculateLayoutNodes(reactFlownodes: Node<any, string | undefined>[], edges: Edge<any>[], screenWidth: number) {
    let hierarchy: NodeData = {} as NodeData;
    const rootId: string = findRoot()

    generateStructForFlextree(hierarchy, reactFlownodes)

    let { nodes } = layoutFromMap(rootId, hierarchy, defaultSettings);
    let rootWidth = 0;
    nodes.forEach((node) => {
        const reactFlowNode = reactFlownodes.find((value) => value.data.label === node.name)
        if (reactFlowNode) {
            reactFlowNode.data.label = reactFlowNode.id  // TEST ONLY

            reactFlowNode.position = {
                x: node.x,
                y: node.y
            } 

            if (reactFlowNode.id === rootId) {
                rootWidth = node.width
            }
        }
    })

    setInfoSection(reactFlownodes, screenWidth, rootWidth)

    return { lNode: reactFlownodes, lEdge: edges, rootInfo: { width: rootWidth } };
}