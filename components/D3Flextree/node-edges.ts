import { MarkerType, Node } from "reactflow";
import { GroupType, IMicroNode, mockData } from "./data";

const position = { x: 0, y: 0 };
const edgeType = 'default';
export interface IGroupValueMap {
    name: string;
    next: string[];
    members: IMicroNode[];
}
export let groupMember = new Map<string, IGroupValueMap>() // key: {group node id, group name}, value: node's member

export function getInitialNodesAndEdges() {
    let initialNodes: Node<any, string | undefined>[] = [];
    let initialEdges: {
        id: string;
        source: string;
        target: string;
        type: string;
        markerEnd: {
            type: MarkerType;
            color: string;
        };
    }[] = [];

    mockData.groups.forEach(group => {
        initialNodes.push({
            id: group.id,
            data: { label: group.name },
            position,
            draggable: false,
            type: group.type === GroupType.Single ? 'singleNode' : 'groupNode'  // TODO: Add GroupType.Unordered and cutom SingleNode to show progress
        });

        groupMember.set(group.id, {name: group.name, next: group.next, members: group.members})

        group.next.forEach(next => {
            initialEdges.push({
                id: `e${group.id}${next}`,
                source: group.id,
                target: next,
                type: edgeType,
                markerEnd: { type: MarkerType.ArrowClosed, color: 'black' }
            });
        })
    })

    return { initialNodes, initialEdges };
}