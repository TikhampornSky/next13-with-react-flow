import { BasicFlow, Item } from '@/components'
import { Grid } from '@mui/material'


export default function Home() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Item>
          <BasicFlow />
        </Item>
      </Grid>
    </Grid>
  )
}
