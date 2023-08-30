import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import EducationInformationList from "./education-list/education-information-list.jsx";
import { useState } from "react";
import AddBootcampsModal from "../../../components/modals/add-bootcamps-modal/add-bootcamps-modal.jsx";

const EducationalInformation = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  return (
    <Content title="Ma’lumot">
      <PageHeader
        pageTitle={"Ma’lumotlar"}
        btnTitle={"O’zgartirish"}
        isButtonVisible
        onClickButton={setIsOpenModal.bind(null, true)}
      />
      <EducationInformationList />

      {isModalOpen && (
        <AddBootcampsModal
          isOpen={isModalOpen}
          onClose={setIsOpenModal.bind(null, false)}
        />
      )}
    </Content>
  );
};
export default EducationalInformation;
