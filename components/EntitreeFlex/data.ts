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

// For EntitreeFlex name of each node must be unique !!!
export const mockData: IMockData = {
    groups: [
        {
            id: '1', name: 'Overview', next: ['2', '3'], type: GroupType.Single, 
            members: [
                { id: '1', name: 'Overview', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '2', name: 'Comment', next: ['8'], type: GroupType.Single, 
            members: [
                { id: '2', name: 'Comment', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '3', name: 'Syntax - 2', next: ['4', '9'], type: GroupType.Ordered, 
            members: [
                { id: '31', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
                { id: '32', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
                { id: '33', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                { id: '34', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                { id: '35', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice }
            ]
        },
        {
            id: '4', name: 'Operator', next: ['5', '6'], type: GroupType.Ordered, 
            members: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
                { id: '43', name: 'Bitwise - 1', progress: 90, type: MicroNodeType.Micro },
                { id: '44', name: 'Arithmatic - 1', progress: 0, type: MicroNodeType.Micro },
                { id: '45', name: 'Bitwise - 2', progress: 90, type: MicroNodeType.Micro },
                { id: '46', name: 'Arithmatic - 2', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '5', name: 'Control Flow', next: ['7'], type: GroupType.Unordered, 
            members: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroNodeType.Micro },
                // { id: '52', name: 'Loop', progress: 0, type: MicroNodeType.Micro },
                // { id: '53', name: 'Function 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '54', name: 'Loop 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '55', name: 'Function 2', progress: 0, type: MicroNodeType.Micro },
                // { id: '56', name: 'Function 3', progress: 0, type: MicroNodeType.Micro },
                // { id: '57', name: 'Loop 2', progress: 0, type: MicroNodeType.Micro },
                // { id: '58', name: 'Function 4', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '6', name: 'Useful Library', next: ['7'], type: GroupType.Unordered, 
            members: [
                { id: '61', name: 'Built-in function', progress: 0, type: MicroNodeType.Micro },
                { id: '62', name: 'Standard library', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '7', name: 'Python Final Test', next: ['10'], type: GroupType.Single, 
            members: [
                { id: '7', name: 'Python Final Test', progress: 0, type: MicroNodeType.Test }
            ]
        },
        {
            id: '8', name: 'Comment 2', next: [], type: GroupType.Single, 
            members: [
                { id: '8', name: 'Comment 2', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '9', name: 'Operator2', next: [], type: GroupType.Ordered, 
            members: [
                { id: '91', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '92', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
                { id: '93', name: 'Arithmatic 2', progress: 0, type: MicroNodeType.Micro },
                { id: '94', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '10', name: 'Syntax - 1', next: [], type: GroupType.Ordered, 
            members: [
                { id: '101', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
                { id: '102', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
                { id: '103', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                { id: '104', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                { id: '105', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice },
                { id: '106', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
                { id: '107', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
                { id: '108', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                { id: '109', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                { id: '1010', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice },
                { id: '1011', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                { id: '1012', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                { id: '1013', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice }
            ]
        },
    ]
}