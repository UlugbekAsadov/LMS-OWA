import { Col, Label, Modal, ModalBody } from "reactstrap";
import { Icon } from "../../icon/icon.jsx";
import RSelect from "../../react-select/react-select.jsx";
import { rolesMock } from "../../../utils/mocks/index.js";
import Button from "../../button/button.jsx";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";

const AddCourseModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const [selectedRole, setSelectedRole] = useState(null);
  const handleChangeCourse = (value) => {
    setValue("rol", value.value);
    setSelectedRole(value);
  };
  const handleSubmitForm = (values) => {
    console.log({ values, errors });
  };
  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody className={"gap-20"}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
              <span className="close cursor-pointer" onClick={onClose}>
                <Icon name="cross-sm"></Icon>
              </span>
          <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
            <h2 className="fw-bold  fs-3">Yangi kurs</h2>
            <p className="fs-7">
              Shartnoma qo’shishda bosqichama-bosqich maydonlarni to’ldiring
            </p>
          </div>
          <div className="form-group">
            <Label htmlFor="course_name" className="form-label fs-6">
              Nomi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${errors.course_name && "error"}`}
                type="text"
                id="course_name"
                {...register("first_name", { required: "Kurs nomini kiriting" })}
              />
              {errors.course_name && (
                <span className="invalid">{errors.course_name.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="price" className="form-label fs-6">
              Narxi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${errors.price && "error"}`}
                type="number"
                id="price"
                {...register("price", { required: "Kurs narxini kiriting" })}
              />
              {errors.price && (
                <span className="invalid">{errors.price.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="term" className="form-label fs-6">
              Muddati
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${errors.term && "error"}`}
                type="number"
                id="name_surname"
                {...register("term", { required: "Kurs muddatini kiriting" })}
              />
              {errors.term && (
                <span className="invalid">{errors.term.message}</span>
              )}
            </div>
          </div>
          <div className="form-group  ">
            <label className="form-label">Rol</label>
            <RSelect
              options={rolesMock}
              value={selectedRole}
              onChange={handleChangeCourse}
            />
          </div>
          <Col sm="6" className={"w-100 d-flex align-items-center justify-content-center "}>
            <Button
              size="lg"
              className="btn-block w-20 mb-4"
              type="submit"
              color="primary"
            >
              Saqlash
            </Button>
          </Col>
        </form>
      </ModalBody>
    </Modal>
  );
};
AddCourseModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AddCourseModal;