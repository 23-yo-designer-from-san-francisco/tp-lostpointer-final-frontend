import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { Arrow90degDown, Postage } from 'react-bootstrap-icons';

export const SidebarData = [
  {
    title: 'Overview',
    path: '/overview',
    icon: <Postage />,
    iconClosed: <Arrow90degDown />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
