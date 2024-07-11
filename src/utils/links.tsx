import { FaHome, FaUser } from 'react-icons/fa';

import { MenuItem } from './types';

export const links: MenuItem[] = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: <FaHome size={35} />,
    roles: ['admin', 'regular_user'],
  },

  {
    id: 2,
    text: 'Stats',
    path: '/stats',
    icon: <FaHome size={35} />,
    roles: ['admin', 'regular_user'],
  },
];

export const Mobilelinks: MenuItem[] = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: <FaHome size={20} />,
    roles: ['admin', 'regular_user'],
  },
];
