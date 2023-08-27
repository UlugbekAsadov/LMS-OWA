import StaffsPage from "../../staffs/staffs-page.jsx";
import { useQuery } from "react-query";
import { getMyStaffsQueryFn } from "../../../react-query/queries/educational.query.js";
import { USER_ROLES } from "../../../utils/enums/index.js";

const EducationStaff = () => {
  const userData = useQuery({
    queryKey: ["user"],
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bootcamp-staffs"],
    queryFn: () => getMyStaffsQueryFn(),
    enabled: userData.data.role === USER_ROLES.COMPANY_OWNER,
  });
  console.log(data);
  if (isLoading) {
    return null;
  }
  return (
    <StaffsPage
      isLoading={isLoading}
      data={data.users}
      bootcampId={null}
      refetch={refetch}
    />
  );
};
export default EducationStaff;
