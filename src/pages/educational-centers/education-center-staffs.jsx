import StaffsPage from "../staffs/staffs-page.jsx";
import { useQuery } from "react-query";
import { getMyCompanyUsersQueryFn } from "../../react-query/queries/index.js";
import { USER_ROLES } from "../../utils/enums/index.js";
import { useParams } from "react-router-dom";

const EducationCenterStaffs = () => {
  const { companyId } = useParams();

  const userData = useQuery({
    queryKey: ["user"],
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`bootcamp-staffs-${companyId}`],
    queryFn: () => getMyCompanyUsersQueryFn(companyId),
    enabled: userData.data.role === USER_ROLES.SUPER_ADMIN,
  });

  if (isLoading) {
    return null;
  }
  return (
    <StaffsPage
      isLoading={isLoading}
      data={data.records}
      companyId={companyId}
      refetch={refetch}
    />
  );
};
export default EducationCenterStaffs;
