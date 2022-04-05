import { Routes as RouterRoutes, Route } from 'react-router-dom';
import BestSellers from '../views/BestSellers';
import Lists from '../views/Lists';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Lists />} />
      <Route path="best-sellers/:list" element={<BestSellers />} />
      <Route path="*" element={<Lists />} />
    </RouterRoutes>
  );
};

export default Routes;
