import { Col, Label, Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import { Icon } from "../../icon/icon.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";
import { rolesMock } from "../../../utils/mocks/index.js";
import { InputMask } from "primereact/inputmask";
import { useMutation, useQuery } from "react-query";
import {
  addStaffToCompanySuperAdminMutationFn,
  editStaffMutationFn,
} from "../../../react-query/mutations/index.js";
import { useParams } from "react-router-dom";
import {
  ERROR_MESSAGE_TRANSLATIONS,
  ERROR_MESSAGES,
} from "../../../utils/enums/index.js";
import { getBootcampStaffs } from "../../../react-query/queries/index.js";

const AddStaffModal = ({ isOpen, onClose, initialValue }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });

  const roles = rolesMock.slice(1, rolesMock.length);
  const { bootcampId } = useParams();
  const [selectedRole, setSelectedRole] = useState(
    initialValue ? initialValue.role : roles[0]
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { refetch } = useQuery({
    queryKey: [`bootcamp-staffs-${bootcampId}`],
    queryFn: () => getBootcampStaffs(bootcampId),
    enabled: false,
  });

  const addStaffMutation = useMutation({
    mutationKey: ["add-staff"],
    mutationFn: (config) =>
      addStaffToCompanySuperAdminMutationFn(bootcampId, config),
    onSuccess: (data) => {
      if (data?.error?.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS) {
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[data.error.message],
        });
      }
      refetch();
      onClose();
    },
  });

  const editStaffMutation = useMutation({
    mutationKey: ["edit-staff"],
    mutationFn: (config) => editStaffMutationFn(initialValue.id, config),
    onSuccess: (data) => {
      if (data?.error?.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS) {
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[data.error.message],
        });
      }
      refetch();
      onClose();
    },
  });

  const handleSubmitForm = (values) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    values.phone = values.phone.replace(regex, "$1$2$3$4");
    const body = {
      ...values,
      role: selectedRole.value,
    };

    const config = {
      method: initialValue ? "PUT" : "POST",
      body: JSON.stringify(body),
    };

    if (initialValue) {
      editStaffMutation.mutate(config);
    } else {
      addStaffMutation.mutate(config);
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody className={"gap-20"}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <span className="close cursor-pointer" onClick={onClose}>
            <Icon name="cross-sm"></Icon>
          </span>
          <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
            <h2 className="fw-bold  fs-3">
              O’quv markaz uchun xodim{" "}
              {initialValue ? "tahrirlash" : "qo’shish"}
            </h2>
            <p className="fs-7">Quyidagi maydonlarni to’ldirib chiqing</p>
          </div>
          <div className="form-group">
            <Label htmlFor="fullName " className="form-label fs-6">
              Ismi va familiyasi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.fullName && "error"
                }`}
                type="text"
                id="fullName "
                {...register("fullName", {
                  required: "Ismi yoki familiyani kiriting",
                })}
              />
              {errors.fullName && (
                <span className="invalid">{errors.fullName.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="phone" className="form-label fs-6">
              Telefon raqami
            </Label>
            <div className="form-control-wrap">
              <InputMask
                id="phone"
                {...register("phone", {
                  required: "Telefon raqamni kiriting",
                })}
                className={`form-control-lg form-control  ${
                  errors.first_name && "error"
                }`}
                mask="(99) 999-99-99"
                placeholder="(99) 999-99-99"
              />
              {errors.phone && (
                <span className="invalid">{errors.phone.message}</span>
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
                  errors.password && "error"
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
              options={roles}
              value={selectedRole}
              onChange={setSelectedRole}
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
              isLoading={addStaffMutation.isLoading}
            >
              Saqlash
            </Button>
          </Col>
        </form>
      </ModalBody>
    </Modal>
  );
};

AddStaffModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  initialValue: PropTypes.object,
};
export default AddStaffModal;
