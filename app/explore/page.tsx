"use client"
import { Item } from "@/components";
import D3FlexTree from "@/components/D3Flextree";
import LayoutFlow from "@/components/DagreTree";
import EntitreeTree from "@/components/EntitreeFlex";
import { ReactFlowProvider } from 'reactflow'

export default function Explore() {
    return (
        <Item>
            <div style={{ width: '100vw', height: '5vh', backgroundColor: 'blue' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: 'pink' }}> 1 </h1>
            </div>
            <div style={{ width: '100vw', height: '95vh' }}>
                <ReactFlowProvider>
                    <EntitreeTree />
                </ReactFlowProvider>
            </div>
        </Item>
    )
}