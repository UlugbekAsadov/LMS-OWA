import { useState } from "react";
import PageHeader from "../../components/page-header/page-header";
import { Content } from "../../layout/page-layout/page-layout";

const FutureProfessionsContract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Content title="Kelajak Kasblari shartnoma">
      <PageHeader
        pageTitle={"Kelajak kasblari shartnoma"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        btnTitle={"Yangi shartnoma"}
        btnIcon={"plus"}
        headerButtonAction={setIsModalOpen.bind(null, true)}
      />

      {/* <ContractsList contractsListData={contractsData} /> */}
      {/* <FutureProfessionsModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen.bind(null, false)}
      /> */}
    </Content>
  );
};

export default FutureProfessionsContract;
