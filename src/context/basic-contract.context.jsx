import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const BasicContracts = createContext(null);

const useBasicContracts = () => useContext(BasicContracts);

const DEFAULT_FORM_VALUES = {
  type_id: "9a4ce7bc-b0d7-4dcd-97c7-ed3dac0e295e",
  first_name: "",
  last_name: "",
  middle_name: "",
  birthday: new Date().getTime(),
  // phone: "",
  course_id: "",
  region_id: "",
  district_id: "",
  address: "",
  // document_type: "",
  document_given: "",
  document_given_date: "", // MM-DD-YYY
  document_serial: "",
  document_number: "",
  pin: "",
  is_auto_filled: false,
  is_representative: false,
  student_birthday: "", // MM-DD-YYYY
  // student_doc_serial: "",
  // student_doc_number: "",
  student_fname: "",
  student_lname: "",
  student_mname: "",
};

const BasicContractsProvider = ({ children }) => {
  const form = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  console.log(form);
  return (
    <BasicContracts.Provider value={form}>{children}</BasicContracts.Provider>
  );
};

BasicContractsProvider.propTypes = {
  children: PropTypes.node,
};

export { BasicContractsProvider, useBasicContracts };
