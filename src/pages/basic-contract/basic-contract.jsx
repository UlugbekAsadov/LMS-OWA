import PageHeader from "../../components/page-header/page-header";
import { contractsMock } from "../../utils/mocks";
import ContractsTable from "../components/table/contracts-table";
import { Content } from "../../layout/page-layout/page-layout";

const BasicContracts = () => {
  return (
    <Content title="Oddiy shartnoma">
      <PageHeader
        pageTitle={"Oddiy shartnomalar"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        btnTitle={"Yangi shartnoma"}
        btnIcon={"plus"}
      />
      <ContractsTable contractsListData={contractsMock} />
    </Content>
  );
};
export default BasicContracts;
