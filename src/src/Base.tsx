import { Outlet } from 'react-router-dom';
import Box from './components/box/Box';
import Navigator from './features/navigator/Navigator';
import OutletLayout from './components/layout/OutletLayout';

const Base = () => {
  return (
    <Box>
      <Navigator/>
      <OutletLayout>
        <Outlet/>
      </OutletLayout>
    </Box>
  );
}

export default Base;
