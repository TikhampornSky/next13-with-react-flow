import { IGroupValueMap, groupMember } from "./node-edges";

export function findTopologicalSortDFS(): string[] {
    let tOrder: string[] = [];
    let visited: Set<string> = new Set<string>();
    let allVertices: string[] = Array.from(groupMember.keys())

    for (let vertex of allVertices) {
        if (!visited.has(vertex)) {
            DFSTraversal(vertex, visited, tOrder, groupMember);
        }
    }

    return tOrder;
}
  
function DFSTraversal(currentVertex: string, visited: Set<string>, tOrder: string[], adjList: Map<string, IGroupValueMap>) {
    visited.add(currentVertex);
    if (adjList.has(currentVertex)) {
        let adj = adjList.get(currentVertex)
        if (adj) {
            adj.next.forEach(edgeVertex => {
                if (!visited.has(edgeVertex)) {
                    DFSTraversal(edgeVertex, visited, tOrder, adjList);
                }
            });
        }
    }

    tOrder.unshift(currentVertex);
}