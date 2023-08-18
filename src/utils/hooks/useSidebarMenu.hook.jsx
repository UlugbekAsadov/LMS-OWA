import { useQuery } from "react-query";
import { getContractTypesQuery } from "../../react-query/queries";
import { menuMock } from "../mocks";
import { USER_ROLES } from "../enums";
import { useState } from "react";

export const useSidebarMenu = () => {
  const [contractTypes, setContractTypes] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["contracts-types"],
    queryFn: () => getContractTypesQuery(),
    onSuccess: (data) => {
      const newArr = data.map((c) => {
        return { text: c.name, link: `/contracts/${c.id}` };
      });

      setContractTypes(newArr);
    },
  });

  return {
    isLoading,
    sidebar_menu: [
      ...menuMock,
      {
        icon: "file-docs",
        text: "Shartnomalar",
        link: "/contracts",
        active: false,
        access: [USER_ROLES.COMPANY_STAFF, USER_ROLES.COMPANY_OWNER],
        subMenu: contractTypes,
      },
    ],
  };
};
