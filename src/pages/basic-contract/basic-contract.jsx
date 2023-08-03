import PageLayout from "../../layout/page-layout/page-layout";
import { contractsMock } from "../../utils/mocks";
import ContractsTable from "../components/table/contracts-table";

const BasicContracts = () => {
  return (
    <PageLayout
      pageTitle={"Oddiy shartnomalar"}
      pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
      btnName={"Yangi shartnoma"}
      iconName={"plus"}
    >
      <ContractsTable contractsListData={contractsMock} />
    </PageLayout>
  );
};
export default BasicContracts;
