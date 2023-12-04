import { Item } from "@/components";
import LayoutFlow from "@/components/DagreTree";
import { Grid } from "@mui/material";

export default function Explore() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Item>
                    {/* <LayoutFlow /> Doesn't work */}
                </Item>
            </Grid>
        </Grid>
    )
}