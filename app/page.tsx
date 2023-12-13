import { fetchMockData } from '@/backend'
import { BasicFlow } from '@/components'

export default async function Home() {
  const mockData = await fetchMockData()
  return (
    <main>
      <BasicFlow data={mockData} />
    </main>
  )
}
