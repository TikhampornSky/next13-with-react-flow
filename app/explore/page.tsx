import { Item } from "@/components";
import D3FlexTree from "@/components/D3Flextree";
import LayoutFlow from "@/components/DagreTree";
import EntitreeTree from "@/components/EntitreeFlex";
import { Grid } from "@mui/material";

export default function Explore() {
    // return (
    //     <Grid
    //         container
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="center"
    //     >
    //         <Grid item>
    //             <Item>
    //                 {/* <LayoutFlow />  */}
    //                 <D3FlexTree />
    //                 {/* <EntitreeTree /> */}
    //             </Item>
    //         </Grid>
    //     </Grid>
    // )
    return (
        <D3FlexTree />
    )
}