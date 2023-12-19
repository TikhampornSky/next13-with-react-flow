"use client"
import { Item } from "@/components";
import D3FlexTree from "@/components/D3Flextree";
import LayoutFlow from "@/components/DagreTree";
import EntitreeTree from "@/components/Playground";
import { useScreenContext } from "@/components/Playground/context/ScreenContext";
import { ReactFlowProvider } from 'reactflow'

export default function Explore() {
    const { screenWidth, screenHeight } = useScreenContext();

    return (
        <Item>
            <div style={{ width: '100vw', height: '5vh', backgroundColor: 'blue' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: 'pink' }}> 1 </h1>
            </div>
            <div style={{ width: '100vw', height: '95vh' }}>
                {screenWidth !== null && screenHeight != null &&
                    <ReactFlowProvider>
                        <EntitreeTree screenWidth={screenWidth} screenHeight={screenHeight}/>
                        {/* <D3FlexTree /> */}
                    </ReactFlowProvider>
                }
                {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
            </div>
        </Item>
    )
}