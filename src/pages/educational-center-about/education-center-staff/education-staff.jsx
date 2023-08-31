import StaffsPage from "../../staffs/staffs-page.jsx";
import { useQuery } from "react-query";
import { getMyCompanyQueryFn } from "../../../react-query/queries/companies.query.js";
import { USER_ROLES } from "../../../utils/enums/index.js";

const EducationStaff = () => {
  const userData = useQuery({
    queryKey: ["user"],
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bootcamp-staffs"],
    queryFn: () => getMyCompanyQueryFn(),
    enabled: userData.data.role === USER_ROLES.COMPANY_OWNER,
  });
  if (isLoading) {
    return null;
  }
  return (
    <StaffsPage isLoading={isLoading} data={data.users} refetch={refetch} />
  );
};
export default EducationStaff;
