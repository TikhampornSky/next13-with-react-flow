"use client"
import { Item } from "@/components";
import D3FlexTree from "@/components/D3Flextree";
import LayoutFlow from "@/components/DagreTree";
import EntitreeTree from "@/components/EntitreeFlex";
import { useScreenContext } from "@/components/EntitreeFlex/context/ScreenContext";
import { ReactFlowProvider } from 'reactflow'

export default function Explore() {
    const { screenWidth, setScreenWidth } = useScreenContext();

    return (
        <Item>
            <div style={{ width: '100vw', height: '5vh', backgroundColor: 'blue' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: 'pink' }}> 1 </h1>
            </div>
            <div style={{ width: '100vw', height: '95vh' }}>
                {screenWidth !== null &&
                    <ReactFlowProvider>
                        <EntitreeTree screenWidth={screenWidth} setScreenWidth={setScreenWidth}/>
                    </ReactFlowProvider>
                }
                {screenWidth === null && <p>Loading...</p>}
            </div>
        </Item>
    )
}