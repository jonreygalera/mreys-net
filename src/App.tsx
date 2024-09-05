import { useState } from 'react'
import { Navigator } from './components/navigator'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet/>
      <Navigator/>
    </>
  )
}

export default App
