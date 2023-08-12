import { USER_ROLES } from "../enums";

export const menuMock = [
  {
    icon: "property",
    text: "O'quv markazlar",
    link: "/educational-center",
    active: false,
    access: [USER_ROLES.ADMIN],
  },
  {
    icon: "todo",
    text: "Kurslar",
    link: "/courses-list",
    active: false,
    access: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.SUPER_ADMIN],
  },
  {
    icon: "panel",
    text: "Shartnomalar turi",
    link: "/contracts-type-list",
    active: false,
    access: [USER_ROLES.ADMIN, USER_ROLES.OWNER],
  },
  {
    icon: "file-docs",
    text: "Shartnomalar",
    link: "/contract",
    active: false,
    access: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.SUPER_ADMIN],
    subMenu: [
      {
        text: "Oddiy shartnomalar",
        link: "/basic-contracts",
      },
      {
        text: "Kelajak kasblari",
        link: "/grand-contract",
      },
    ],
  },
];
