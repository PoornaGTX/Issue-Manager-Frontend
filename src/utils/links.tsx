import { FaHome } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';

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
    icon: <IoIosStats size={35} />,
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
  {
    id: 2,
    text: 'Stats',
    path: '/stats',
    icon: <IoIosStats size={20} />,
    roles: ['admin', 'regular_user'],
  },
];
