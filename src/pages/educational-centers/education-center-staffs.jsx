import StaffsPage from "../staffs/staffs-page.jsx";
import { useQuery } from "react-query";
import { getBootcampStaffs } from "../../react-query/queries/index.js";
import { USER_ROLES } from "../../utils/enums/index.js";
import { useParams } from "react-router-dom";

const EducationCenterStaffs = () => {
  const { bootcampId } = useParams();

  const userData = useQuery({
    queryKey: ["user"],
  });

  const { data, isLoading } = useQuery({
    queryKey: [`bootcamp-staffs-${bootcampId}`],
    queryFn: () => getBootcampStaffs(bootcampId),
    enabled: userData.data.role === USER_ROLES.SUPER_ADMIN,
  });

  if (isLoading) {
    return null;
  }
  return <StaffsPage isLoading={isLoading} data={data.records} />;
};
export default EducationCenterStaffs;
