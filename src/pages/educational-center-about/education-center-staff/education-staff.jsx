import StaffsPage from "../../staffs/staffs-page.jsx";
import { useQuery } from "react-query";
import { getMyStsffsQueryFn } from "../../../react-query/queries/educational.query.js";
import { USER_ROLES } from "../../../utils/enums/index.js";

const EducationStaff = () => {
  const userData = useQuery({
    queryKey: ["user"],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["bootcamp-staffs"],
    queryFn: () => getMyStsffsQueryFn(),
    enabled: userData.data.role === USER_ROLES.COMPANY_OWNER,
  });
  if (isLoading) {
    return null;
  }
  return <StaffsPage isLoading={isLoading} data={data.users} />;
};
export default EducationStaff;
