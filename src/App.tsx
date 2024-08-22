import { useState } from 'react'
import MobileNavigator from './components/navs/MobileNav/MobileNavigator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MobileNavigator/>
    </>
  )
}

export default App
