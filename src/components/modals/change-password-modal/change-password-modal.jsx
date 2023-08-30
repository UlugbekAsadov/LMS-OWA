import PropTypes from "prop-types";
import { useMutation, useQuery } from "react-query";
import { Col, Label, Modal, ModalBody } from "reactstrap";
import { Icon } from "../../icon/icon.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "../../button/button.jsx";
import {
  updatePasswordByOwnerMutationFn,
  updatePasswordBySuperAdminMutationFn,
} from "../../../react-query/mutations/index.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_ROLES } from "../../../utils/enums/index.js";

export const ChangePasswordModal = ({ isOpen, onClose, userId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [isPasswordsVisible, setIsPasswordsVisible] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const { bootcampId } = useParams();
  const [isPasswordsMatched, setIsPasswordsMatches] = useState(false);
  const newPasswordValue = watch("new_password");
  const confirmPasswordValue = watch("confirm_password");

  const { data: userData } = useQuery({
    queryKey: ["user"],
  });

  const changeStaffPasswordByAdminMutation = useMutation({
    mutationKey: ["change-staff-password"],
    mutationFn: (config) =>
      updatePasswordBySuperAdminMutationFn(bootcampId, userId, config),
    onSuccess: (res) => {
      if (!res?.error) {
        toast.success("Parol o'zgartirildi");
        onClose();
      }
    },
  });

  const changeStaffPasswordByOwnerMutation = useMutation({
    mutationFn: (config) => updatePasswordByOwnerMutationFn(userId, config),
    onSuccess: (res) => {
      if (!res?.error) {
        toast.success("Parol o'zgartirildi");
        onClose();
      }
    },
  });

  const handleSubmitForm = (values) => {
    if (values.new_password !== values.confirm_password) {
      return setIsPasswordsMatches(true);
    }

    const config = {
      method: "PATCH",
      body: JSON.stringify(values),
    };

    if (userData.role === USER_ROLES.COMPANY_OWNER) {
      changeStaffPasswordByOwnerMutation.mutate(config);
    } else {
      changeStaffPasswordByAdminMutation.mutate(config);
    }
  };

  const handleClickEyeIcon = (name) => {
    setIsPasswordsVisible({
      ...isPasswordsVisible,
      [name]: !isPasswordsVisible[name],
    });
  };

  useEffect(() => {
    setIsPasswordsMatches(false);
  }, [newPasswordValue, confirmPasswordValue]);

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <span className="close cursor-pointer" onClick={onClose}>
            <Icon name="cross-sm"></Icon>
          </span>
          <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
            <h2 className="fw-bold  fs-3">{`Xodim parolini o'zgartirish`} </h2>
            <p className="fs-7">Quyidagi maydonlarni to’ldirib chiqing</p>
          </div>
          <div className={`form-group`}>
            <Label htmlFor="new_password" className="form-label fs-6">
              Yangi parol
            </Label>
            <div className="form-control-wrap">
              <span
                onClick={handleClickEyeIcon.bind(null, "newPassword")}
                className={`form-icon lg form-icon-right passcode-switch  cursor-pointer ${
                  isPasswordsVisible.newPassword ? "is-hidden" : "is-shown"
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
                type={isPasswordsVisible.newPassword ? "text" : "password"}
                {...register("new_password", {
                  required: "Parolni kiriting",
                })}
                className={`form-control-lg form-control ${
                  errors.first_name && "error"
                } ${isPasswordsVisible.newPassword ? "is-hidden" : "is-shown"}`}
              />
              {errors.new_password && (
                <span className="invalid">{errors.new_password.message}</span>
              )}
            </div>
          </div>
          <div className={`form-group  `}>
            <Label htmlFor="confirm_password" className="form-label fs-6">
              Parolni tasdiqlang
            </Label>
            <div className="form-control-wrap">
              <span
                onClick={handleClickEyeIcon.bind(null, "confirmPassword")}
                className={`form-icon lg form-icon-right passcode-switch  cursor-pointer ${
                  isPasswordsVisible.confirmPassword ? "is-hidden" : "is-shown"
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
                type={isPasswordsVisible.confirmPassword ? "text" : "password"}
                id="password"
                {...register("confirm_password", {
                  required: "Parolni kiriting",
                })}
                className={`form-control-lg form-control ${
                  errors.first_name && "error"
                } ${
                  isPasswordsVisible.confirmPassword ? "is-hidden" : "is-shown"
                }`}
              />
              {errors.confirm_password && (
                <span className="invalid">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
          </div>

          {isPasswordsMatched && (
            <p className="text-danger text-center mx-auto">
              Parollar bir-biriga mos kelmadi
            </p>
          )}
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
              isLoading={changeStaffPasswordByAdminMutation.isLoading}
            >
              Saqlash
            </Button>
          </Col>
        </form>
      </ModalBody>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  userId: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
