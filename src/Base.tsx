import { Navigator } from './components/navigator'
import { Outlet } from 'react-router-dom'

const Base = () => {
  return (
    <>
      <Outlet/>
      <Navigator/>
    </>
  )
}

export default Base;
