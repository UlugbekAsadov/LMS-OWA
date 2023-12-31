import { Col, Label, Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import { Icon } from "../../icon/icon.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import { Button } from "../../button/button.jsx";
import { rolesMock } from "../../../utils/mocks/index.js";
import { InputMask } from "primereact/inputmask";
import { useMutation, useQuery } from "react-query";
import {
  ERROR_MESSAGE_TRANSLATIONS,
  ERROR_MESSAGES,
  USER_ROLES,
} from "../../../utils/enums/index.js";
import {
  createUserByAdminMutationFn,
  createUserByOwnerMutationFn,
  editUserByAdminMutationFn,
  editUserByOwnerMutationFn,
} from "../../../react-query/mutations/index.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddStaffModal = ({ isOpen, onClose, initialValue, refetch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });

  const [roles] = useState(rolesMock.slice(1, rolesMock.length));
  const [selectedRole, setSelectedRole] = useState(
    initialValue ? initialValue.role : roles[0]
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { companyId } = useParams();

  const userData = useQuery({
    queryKey: ["user"],
  });

  const editStaff = useMutation({
    mutationKey: ["edit-staff"],
    mutationFn: (config) => editUserByOwnerMutationFn(config, initialValue.id),
    onSuccess: (res) => {
      setIsLoading(false);
      if (res?.error?.message === ERROR_MESSAGES.PHONE_ALREADY_EXISTS) {
        setIsLoading(false);
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[res.error.message],
        });
      }
      reset();
      setSelectedRole(null);
      onClose();
      refetch();
      toast.success("Tahrirlandi");
    },
  });

  const editCompanyStaff = useMutation({
    mutationKey: ["edit-compaies-staff"],
    mutationFn: (config) =>
      editUserByAdminMutationFn(config, companyId, initialValue.id),
    onSuccess: (res) => {
      setIsLoading(false);
      if (res?.error?.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS) {
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[res.error.message],
        });
      }
      reset();
      onClose();
      refetch();
      setSelectedRole(null);
    },
  });

  const createUserByOwnerMutation = useMutation({
    mutationKey: ["create-user-staff"],
    mutationFn: (config) => createUserByOwnerMutationFn(config),
    onSuccess: (res) => {
      setIsLoading(false);
      if (res?.error?.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS) {
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[res.error.message],
        });
      }
      reset();
      onClose();
      setSelectedRole(null);
      refetch();
    },
  });

  const createCompaniesStaff = useMutation({
    mutationKey: ["create-user-staff"],
    mutationFn: (config) => createUserByAdminMutationFn(config, companyId),
    onSuccess: (res) => {
      setIsLoading(false);
      if (res?.error?.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS) {
        return setError("phone", {
          message: ERROR_MESSAGE_TRANSLATIONS[res.error.message],
        });
      }
      reset();
      onClose();
      setSelectedRole(null);
      refetch();
    },
  });

  const handleChangeRole = (value) => {
    setValue("role", value.value);
    setSelectedRole(value);
  };

  const handleSubmitForm = async (values) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    values.phone = values.phone.replace(regex, "$1$2$3$4");

    setIsLoading(true);
    const body = {
      ...values,
      role: selectedRole.value,
    };

    const config = {
      method: initialValue ? "PUT" : "POST",
      body: JSON.stringify(body),
    };

    if (userData.data.role === USER_ROLES.COMPANY_OWNER) {
      if (initialValue) {
        await editStaff.mutateAsync(config);
      } else {
        await createUserByOwnerMutation.mutateAsync(config);
      }
      return;
    }

    if (userData.data.role === USER_ROLES.SUPER_ADMIN) {
      if (initialValue) {
        await editCompanyStaff.mutateAsync(config);
      } else {
        await createCompaniesStaff.mutateAsync(config);
      }
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
            <Label htmlFor="full_name " className="form-label fs-6">
              Ismi va familiyasi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.full_name && "error"
                }`}
                type="text"
                id="full_name "
                {...register("full_name", {
                  required: "Ismi yoki familiyani kiriting",
                })}
              />
              {errors.full_name && (
                <span className="invalid">{errors.full_name.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="phone" className="form-label fs-6">
              Telefon raqami
            </Label>
            <div className="form-control-wrap ">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text ">+998</span>
                </div>
                <InputMask
                  id="phone"
                  {...register("phone", {
                    required: "Telefon raqamni kiriting",
                  })}
                  className={`form-control-lg form-control ${
                    errors.phone && "error"
                  }`}
                  mask="(99) 999-99-99"
                  placeholder="(99) 127-99-11"
                />
              </div>
              {errors.phone && (
                <span className="invalid">{errors.phone.message}</span>
              )}
            </div>
          </div>
          {!initialValue && (
            <div className={`form-group  `}>
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
          )}
          <div className="form-group  form-control-wrap">
            <label className="form-label">Rol</label>
            <RSelect
              options={roles}
              value={selectedRole}
              onChange={handleChangeRole}
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
              isLoading={isLoading}
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
  refetch: PropTypes.func,
};
export default AddStaffModal;
