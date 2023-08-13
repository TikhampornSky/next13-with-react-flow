import { Flow } from '@/components'
import NavBar from '@/components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <NavBar />
      <div>
        <Flow />
      </div>
    </div>
  )
}
