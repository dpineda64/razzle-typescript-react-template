import Home from '@pages/home';
import { RouteProps } from 'react-router-dom';

const baseRoutes: RouteProps[] = [
  {
    id: 'home-page',
    exact: true,
    component: Home,
    path: '/',
  },
];

export default baseRoutes;
