import { USER_ROLES } from "../enums";

export const menuMock = [
  {
    icon: "property",
    text: "O'quv markazlar",
    link: "/educational-center",
    active: false,
    access: [USER_ROLES.SUPER_ADMIN],
  },
  {
    icon: "todo",
    text: "Kurslar",
    link: "/courses-list",
    active: false,
    access: [USER_ROLES.COMPANY_OWNER],
  },
  {
    icon: "panel",
    text: "Shartnomalar turi",
    link: "/contracts-type-list",
    active: false,
    access: [USER_ROLES.COMPANY_OWNER],
  },
  {
    icon: "template",
    text: "O’quv markaz",
    link: "/contract-type-tdsype-list",
    active: false,
    access: [USER_ROLES.COMPANY_OWNER],
    subMenu: [
      {
        text: "Ma’lumot",
        link: "/educational-information",
      },
      {
        text: "Xodimlar",
        link: "/educational-staff-information",
      },
    ],
  },
];
