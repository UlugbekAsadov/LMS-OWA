import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import { Row } from "reactstrap";
import LeftPage from "./element-page/left-page.jsx";
import RightPage from "./element-page/right-page.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getContractTypeByIdQueryFn } from "../../../react-query/queries/index.js";
import { Loader } from "../../../components/index.js";

const CreateContract = () => {
  const { contractId } = useParams();

  const contractType = useQuery({
    queryKey: [`contract-type-${contractId}`],
    queryFn: () => getContractTypeByIdQueryFn(contractId),
    enabled: Boolean(contractId),
  });

  return (
    <Content title="Shartnomalar turi">
      <PageHeader
        pageTitle={"Shartnomalar turi"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        isButtonVisible={false}
      />
      <Row className={"py-3 gy-2"}>
        {contractType.isLoading ? (
          <Loader />
        ) : (
          <>
            <LeftPage initialValue={contractId ? contractType.data : null} />
            <RightPage />
          </>
        )}
      </Row>
    </Content>
  );
};
export default CreateContract;
