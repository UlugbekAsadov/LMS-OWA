import { Col, Label, Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import { Icon } from "../../icon/icon.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";
import { rolesMock } from "../../../utils/mocks/index.js";
import { InputMask } from "primereact/inputmask";

const AddStaff = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedRole, setSelectedRole] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChangeCity = (value) => {
    setValue("rol", value.value);
    setSelectedRole(value);
  };

  const handleSubmitForm = (values) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    values.phone_number = values.phone_number.replace(regex, "$1$2$3$4");
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
            <h2 className="fw-bold  fs-3">O’quv markaz uchun xodim qo’shish</h2>
            <p className="fs-7">Quyidagi maydonlarni to’ldirib chiqing</p>
          </div>
          <div className="form-group">
            <Label htmlFor="name_surname" className="form-label fs-6">
              Ismi va familiyasi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.first_name && "error"
                }`}
                type="text"
                id="name_surname"
                {...register("first_name", {
                  required: "Ismi yoki familiyani kiriting",
                })}
              />
              {errors.first_name && (
                <span className="invalid">{errors.first_name.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="phone_number" className="form-label fs-6">
              Telefon raqami
            </Label>
            <div className="form-control-wrap">
              <InputMask
                id="phone_number"
                {...register("phone_number", {
                  required: "Telefon raqamni kiriting",
                })}
                className={`form-control-lg form-control  ${
                  errors.first_name && "error"
                }`}
                mask="(99) 999-99-99"
                placeholder="(99) 999-99-99"
              />
              {errors.phone_number && (
                <span className="invalid">{errors.phone_number.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="password" className="form-label fs-6">
              Parol
            </Label>
            <div className="form-control-wrap">
              <span
                onClick={() => setIsPasswordVisible((prevVal) => !prevVal)}
                className={`form-icon lg form-icon-right passcode-switch  cursor-pointer ${
                  isPasswordVisible ? "is-hidden" : "is-shown"
                }`}
              >
                <Icon
                  name="eye"
                  className="passcode-icon icon-show fs-4"
                ></Icon>

                <Icon
                  name="eye-off"
                  className="passcode-icon icon-hide fs-4"
                ></Icon>
              </span>
              <input
                autoComplete="new-password"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Parolni kiriting",
                })}
                className={`form-control-lg form-control ${
                  errors.first_name && "error"
                } ${isPasswordVisible ? "is-hidden" : "is-shown"}`}
              />
              {errors.password && (
                <span className="invalid">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="form-group  ">
            <label className="form-label">Rol</label>
            <RSelect
              options={rolesMock}
              value={selectedRole}
              onChange={handleChangeCity}
            />
          </div>
          <Col
            sm="6"
            className={
              "w-100 d-flex align-items-center justify-content-center "
            }
          >
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

AddStaff.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AddStaff;
