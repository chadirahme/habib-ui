import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Lists',
    icon: 'nb-list',
    children: [
      {
        title: 'Professions List',
        link: '/pages/setup/professions-list',
      },
        {
        title: 'Employees List',
        link: '/pages/setup/employees-list',
      },
      {
        title: 'Suppliers List',
        link: '/pages/setup/suppliers-list',
      },
      {
        title: 'PFF Item List',
        link: '/pages/setup/pffitem-list',
      },

    ]
  },

  {
    title: 'Accounting',
    icon: 'nb-list',
    children: [
      // {
      //   title: 'Employee Payments',
      //   link: '/pages/setup/professions-list',
      // },
      {
        title: 'Suppliers Payments',
        link: '/pages/accounting/payments-supplier',
      },

      {
        title: 'Sales',
        link: '/pages/pff/sales',
      },
    ]
  },

  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
