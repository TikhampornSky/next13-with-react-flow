import { MarkerType, Node } from "reactflow";
import { GroupType, IMicroNode, mockData } from "./data";

const position = { x: 0, y: 0 };
const edgeType = 'default';
export interface IGroupValueMap {
    name: string;
    next: string[];
    type: GroupType;
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
            draggable: true,
            type: group.type === GroupType.Single ? 'singleNode' : group.type === GroupType.Ordered ? 'orderedGroupNode' : 'unorderedGroupNode',
        });

        groupMember.set(group.id, {name: group.name, type: group.type, next: group.next, members: group.members})

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