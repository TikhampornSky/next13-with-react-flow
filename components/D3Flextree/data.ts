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
                { id: '1', name: 'Overview', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '2', name: 'Comment', next: ['8'], type: GroupType.Single, 
            members: [
                { id: '2', name: 'Comment', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '3', name: 'Syntax - 2', next: ['4', '9'], type: GroupType.Single, 
            members: [
                { id: '3', name: 'Syntax - 2', progress: 80, type: MicroNodeType.Micro }
                // { id: '31', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
                // { id: '32', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
                // { id: '33', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
                // { id: '34', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
                // { id: '35', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice }
            ]
        },
        {
            id: '4', name: 'Operator', next: ['5', '6', '60'], type: GroupType.Ordered, 
            members: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
                { id: '43', name: 'Bitwise - 1', progress: 90, type: MicroNodeType.Micro },
                { id: '44', name: 'Arithmatic - 1', progress: 0, type: MicroNodeType.Micro },
                { id: '45', name: 'Bitwise - 2', progress: 90, type: MicroNodeType.Micro },
                { id: '46', name: 'Arithmatic - 2', progress: 0, type: MicroNodeType.Micro },
                // { id: '47', name: 'Bitwise - 3', progress: 90, type: MicroNodeType.Micro },
                // { id: '48', name: 'Arithmatic - 3', progress: 0, type: MicroNodeType.Micro },
                // { id: '49', name: 'Bitwise - 4', progress: 90, type: MicroNodeType.Micro },
                // { id: '40', name: 'Arithmatic - 4', progress: 0, type: MicroNodeType.Micro },
                // { id: '411', name: 'Bitwise - 5', progress: 90, type: MicroNodeType.Micro },
                // { id: '412', name: 'Arithmatic - 5', progress: 0, type: MicroNodeType.Micro },
                // { id: '413', name: 'Bitwise - 6', progress: 90, type: MicroNodeType.Micro },
                // { id: '414', name: 'Arithmatic - 6', progress: 0, type: MicroNodeType.Micro },
                // { id: '415', name: 'Bitwise - 7', progress: 90, type: MicroNodeType.Micro },
                // { id: '416', name: 'Arithmatic - 7', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '5', name: 'Control Flow', next: ['7'], type: GroupType.Unordered, 
            members: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroNodeType.Micro },
                // { id: '52', name: 'Loop', progress: 0, type: MicroNodeType.Micro },
                // { id: '53', name: 'Function', progress: 0, type: MicroNodeType.Micro },
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
                // { id: '62', name: 'Standard library', progress: 0, type: MicroNodeType.Micro },
                // { id: '63', name: 'Standard library1', progress: 0, type: MicroNodeType.Micro },
                // { id: '64', name: 'Built-in function - 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '65', name: 'Standard library - 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '66', name: 'Standard library1 - 1', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '60', name: 'Useful Library 2', next: ['7'], type: GroupType.Unordered, 
            members: [
                { id: '61', name: 'Built-in function', progress: 0, type: MicroNodeType.Micro },
                // { id: '62', name: 'Standard library', progress: 0, type: MicroNodeType.Micro },
                // { id: '63', name: 'Standard library1', progress: 0, type: MicroNodeType.Micro },
                // { id: '64', name: 'Built-in function - 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '65', name: 'Standard library - 1', progress: 0, type: MicroNodeType.Micro },
                // { id: '66', name: 'Standard library1 - 1', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        // {
        //     id: '600', name: 'Useful Library 3', next: ['7'], type: GroupType.Unordered, 
        //     members: [
        //         { id: '61', name: 'Built-in function', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '62', name: 'Standard library', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '63', name: 'Standard library1', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '64', name: 'Built-in function - 1', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '65', name: 'Standard library - 1', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '66', name: 'Standard library1 - 1', progress: 0, type: MicroNodeType.Micro },
        //     ]
        // },
        {
            id: '7', name: 'Python Final Test', next: [], type: GroupType.Ordered, 
            members: [
                { id: '71', name: 'Python Final Test 1', progress: 0, type: MicroNodeType.Test },
                // { id: '72', name: 'Python Final Test 2', progress: 0, type: MicroNodeType.Test },
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
        // {
        //     id: '10', name: 'Syntax - 1', next: [], type: GroupType.Ordered, 
        //     members: [
        //         { id: '101', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
        //         { id: '102', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
        //         // { id: '103', name: 'Practice #1', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '104', name: 'Practice #2', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '105', name: 'Practice #3', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '106', name: 'Variable', progress: 80, type: MicroNodeType.Micro },
        //         // { id: '107', name: 'Expression', progress: 70, type: MicroNodeType.Micro },
        //         // { id: '108', name: 'Practice #11', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '109', name: 'Practice #21', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '1010', name: 'Practice #31', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '1011', name: 'Practice #12', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '1012', name: 'Practice #22', progress: 100, type: MicroNodeType.Practice },
        //         // { id: '1013', name: 'Practice Finalll', progress: 100, type: MicroNodeType.Practice }
        //     ]
        // },
    ]
}