import { useState } from 'react'
import { Navigator } from './components/navigator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigator/>
    </>
  )
}

export default App
