import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import { Row } from "reactstrap";
import ContractTypeForm from "./contract-type-form/contract-type-form.jsx";
import ContractTypeWordList from "./contract-type-form/contract-type-word-list.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getContractTypeByIdQueryFn } from "../../../react-query/queries/index.js";
import { Loader } from "../../../components/index.js";

const CreateContract = () => {
  const { contractId } = useParams();

  const contractTypes = useQuery({
    queryKey: [`contract-type-${contractId}`],
    queryFn: () => getContractTypeByIdQueryFn(contractId),
    enabled: Boolean(contractId),
  });
  if (contractTypes.isLoading) {
    return <Loader />;
  }
  return (
    <Content title="Shartnomalar turi">
      <PageHeader
        pageTitle={"Shartnomalar turi"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        isButtonVisible={false}
      />
      <Row className={"py-3 gy-2"}>
        <ContractTypeForm
          initialValue={contractId ? contractTypes.data : null}
        />
        <ContractTypeWordList />
      </Row>
    </Content>
  );
};
export default CreateContract;
