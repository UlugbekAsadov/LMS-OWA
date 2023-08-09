export const menuMock = [
  {
    icon: 'property',
    text: 'O\'quv markazlar',
    link: '/educational-center',
    active: false,
  },
  {
    icon: 'todo',
    text: 'Kurslar',
    link: '/courses-list',
    active: false,
  },
  {
    icon: 'panel',
    text: 'Shartnomalar turi',
    link: '/contracts-type-list',
    active: false,
  },
  {
    icon: 'file-docs',
    text: 'Shartnomalar',
    link: '/contract',
    active: false,
    subMenu: [
      {
        text: 'Oddiy shartnomalar',
        link: '/basic-contract',
      },
      {
        text: 'Kelajak kasblari',
        link: '/grand-contract',
      },
    ],
  },
];
