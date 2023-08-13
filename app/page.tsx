import { fetchMockData } from '@/backend'
import { BasicFlow, Item } from '@/components'
import { Grid } from '@mui/material'


export default async function Home() {
  const mockData = await fetchMockData()
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Item>
          <BasicFlow data={mockData} />
        </Item>
      </Grid>
    </Grid>
  )
}
