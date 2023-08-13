import { BasicFlow, Item } from '@/components'
import NavBar from '@/components/Nav/Navbar'
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
