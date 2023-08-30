import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import EducationInformationList from "./education-list/education-information-list.jsx";
import { useState } from "react";
import AddBootcampsModal from "../../../components/modals/add-bootcamps-modal/add-bootcamps-modal.jsx";
import { useQuery } from "react-query";
import { getMyCompanyQueryFn } from "../../../react-query/queries/index.js";
import { Loader } from "../../../components/index.js";

const EducationalInformation = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const { data: companyData, isLoading } = useQuery({
    queryKey: ["educational-information"],
    queryFn: () => getMyCompanyQueryFn(),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Content title="Ma’lumot">
      <PageHeader
        pageTitle={"Ma’lumotlar"}
        btnTitle={"O’zgartirish"}
        isButtonVisible
        onClickButton={setIsOpenModal.bind(null, true)}
      />

      <EducationInformationList data={companyData} />

      {isModalOpen && (
        <AddBootcampsModal
          initialValue={companyData}
          isOpen={isModalOpen}
          onClose={setIsOpenModal.bind(null, false)}
        />
      )}
    </Content>
  );
};
export default EducationalInformation;
