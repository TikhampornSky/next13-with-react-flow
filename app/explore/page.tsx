import { Item } from "@/components";
import D3FlexTree from "@/components/D3Flextree";
import LayoutFlow from "@/components/DagreTree";
import EntitreeTree from "@/components/EntitreeFlex";

export default function Explore() {
    return (
        <Item>
            <div style={{ width: '100vw', height: '5vh' }}>
                <h1 style={{textAlign: 'center', backgroundColor: 'pink' }}> EntitreeFlex </h1>
            </div>
            <div style={{ width: '100vw', height: '95vh' }}>
                <EntitreeTree />
            </div>
        </Item>
    )
}