export enum GroupType {
    Single,
    Ordered,
    Unordered
}

export enum MicroNodeType {
    Micro,
    Practice,
    Test
}

export interface IMicroNode {
    id: string;
    name: string;
    progress: number;
    type: MicroNodeType;
}

export interface IGroup {
    id: string;
    name: string;
    next: string[];
    type: GroupType;
    members: IMicroNode[];
}

export interface IMockData {
    groups: IGroup[];
}

export const mockData: IMockData = {
    groups: [
        {
            id: '1', name: 'Overview', next: ['2', '3'], type: GroupType.Single, 
            members: [
                { id: '1', name: 'Overview', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '2', name: 'Comment', next: ['7'], type: GroupType.Single, 
            members: [
                { id: '2', name: 'Comment', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '3', name: 'Syntax', next: ['4'], type: GroupType.Ordered, 
            members: [
                { id: '31', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
                { id: '32', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
                { id: '33', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                { id: '34', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                { id: '35', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice }
            ]
        },
        {
            id: '4', name: 'Operator', next: ['5', '6'], type: GroupType.Unordered, 
            members: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '5', name: 'Control Flow', next: ['7'], type: GroupType.Ordered, 
            members: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroNodeType.Micro },
                { id: '52', name: 'Loop', progress: 0, type: MicroNodeType.Micro },
                { id: '53', name: 'Function', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '6', name: 'Useful Library', next: ['7'], type: GroupType.Ordered, 
            members: [
                { id: '61', name: 'Built-in function', progress: 0, type: MicroNodeType.Micro },
                { id: '62', name: 'Standard library', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '7', name: 'Python Final Test', next: [], type: GroupType.Single, 
            members: [
                { id: '7', name: 'Python Final Test', progress: 0, type: MicroNodeType.Test }
            ]
        },
    ]
}