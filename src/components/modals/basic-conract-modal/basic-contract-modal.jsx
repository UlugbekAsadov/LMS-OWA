import {
  ModalBody,
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useState } from "react";
import classNames from "classnames";
import ContractCreator from "./contract-creator";
import { useForm } from "react-hook-form";
import { Icon } from "../../icon/icon";
import PropTypes from "prop-types";
import StudentForm from "./student-form";
import CourseForm from "./course-form";

const TABS = [
  {
    id: 1,
    title: "Shartnoma tuzuvchi",
  },
  {
    id: 2,
    title: "O’quvchi",
  },
  {
    id: 3,
    title: "Kurs",
  },
];

const TAB_CONTENTS = [
  {
    id: 1,
    component: <ContractCreator />,
  },
  {
    id: 2,
    component: <StudentForm />,
  },
  {
    id: 3,
    component: <CourseForm />,
  },
];

const DEFAULT_FORM_VALUES = {};

const BasicContractModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { handleSubmit } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const setModalActive = (modalNumber) => {
    setActiveTab(modalNumber);
  };

  const renderTabs = TABS.map((tab) => (
    <NavItem key={tab.id}>
      <NavLink
        className={`${classNames({
          active: activeTab === tab.id,
        })} cursor-pointer`}
        onClick={setModalActive.bind(null, tab.id)}
      >
        {tab.title}
      </NavLink>
    </NavItem>
  ));

  const rederTabContents = TAB_CONTENTS.map((tabContent, index) => (
    <TabPane key={index} tabId={tabContent.id}>
      {tabContent.component}
    </TabPane>
  ));

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <span className="close cursor-pointer" onClick={onClose}>
            <Icon name="cross-sm"></Icon>
          </span>

          <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center">
            <h2 className="fw-bold  fs-3">Yangi shartnoma</h2>
            <p className="fs-7">
              Shartnoma qo’shishda bosqichama-bosqich maydonlarni to’ldiring
            </p>
          </div>

          <Nav tabs className="mt-n3">
            {renderTabs}
          </Nav>

          <TabContent activeTab={activeTab}>{rederTabContents}</TabContent>
        </form>
      </ModalBody>
    </Modal>
  );
};

BasicContractModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default BasicContractModal;
