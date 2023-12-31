import { useQuery } from "react-query";
import { getAllContractTemplatesQueryFn } from "../../react-query/queries";
import { menuMock } from "../mocks";
import { USER_ROLES } from "../enums";
import { useState } from "react";

export const useSidebarMenu = () => {
  const [contractTypes, setContractTypes] = useState([]);
  const userData = useQuery({
    queryKey: "user",
  });

  const { isLoading } = useQuery({
    queryKey: ["contract-type-types"],
    queryFn: () => getAllContractTemplatesQueryFn(),
    onSuccess: (data) => {
      const newArr = data.map((c) => {
        return { text: c.name, link: `/contracts/${c.id}` };
      });

      setContractTypes(newArr);
    },
    enabled: userData.data.role !== USER_ROLES.SUPER_ADMIN,
  });

  return {
    isLoading,
    sidebar_menu: [
      ...menuMock,
      {
        icon: "file-docs",
        text: "Shartnomalar",
        link: "/contract-type",
        active: false,
        access: [USER_ROLES.COMPANY_STAFF, USER_ROLES.COMPANY_OWNER],
        subMenu: contractTypes,
      },
    ],
  };
};
