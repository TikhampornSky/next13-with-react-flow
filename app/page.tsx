import { BasicFlow, Item } from '@/components'
import NavBar from '@/components/Navbar'
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
          <NavBar /> 
        </Item>
      </Grid>
      <Grid item>
        <Item>
          <BasicFlow />
        </Item>
      </Grid>
    </Grid>
  )
}
