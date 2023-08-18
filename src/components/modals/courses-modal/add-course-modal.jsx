import { Col, Label, Modal, ModalBody } from "reactstrap";
import { Icon } from "../../icon/icon.jsx";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createCourseMutationFn,
  editCourseMutationFn,
} from "../../../react-query/mutations/index.js";
import { getCoursesQuery } from "../../../react-query/queries/index.js";
import {
  ERROR_MESSAGE_TRANSLATIONS,
  ERROR_MESSAGES,
} from "../../../utils/enums/index.js";

const dropDownList = [
  {
    label: "Ha",
    value: 1,
  },
  {
    label: "Yo'q",
    value: 2,
  },
];

const AddCourseModal = ({ isOpen, onClose, initialValue }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: initialValue,
  });
  const [selectedContractType, setSelectedContractType] = useState(
    initialValue ? initialValue.is_kk : dropDownList[0]
  );

  const { refetch } = useQuery({
    queryFn: () => getCoursesQuery(),
    queryKey: ["all-courses-list"],
    enabled: false,
  });

  const createCourseMutation = useMutation({
    mutationKey: ["create-course"],
    mutationFn: (config) => createCourseMutationFn(config),
    onSuccess: (data) => {
      if (data?.error?.message === ERROR_MESSAGES.COURSE_ALREADY_EXISTS) {
        return setError("name", {
          message: ERROR_MESSAGE_TRANSLATIONS[data.error.message],
        });
      }

      reset();
      refetch();
      onClose();
    },
  });

  const updateCourseMutation = useMutation({
    mutationKey: ["update-course"],
    mutationFn: (config) => editCourseMutationFn(initialValue.id, config),
    onSuccess: (data) => {
      if (data?.error?.message === ERROR_MESSAGES.COURSE_ALREADY_EXISTS) {
        return setError("name", {
          message: ERROR_MESSAGE_TRANSLATIONS[data.error.message],
        });
      }

      reset();
      refetch();
      onClose();
    },
  });

  const handleChangeContractType = (value) => {
    setSelectedContractType(value);
  };
  const handleSubmitForm = async (values) => {
    const body = {
      ...values,
      kk_id: selectedContractType.value,
    };

    const config = {
      method: initialValue ? "PUT" : "POST",
      body: JSON.stringify(body),
    };

    if (initialValue) {
      await updateCourseMutation.mutateAsync(config);
    } else {
      await createCourseMutation.mutateAsync(config);
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
            <h2 className="fw-bold  fs-3">Yangi kurs</h2>
            <p className="fs-7">
              Shartnoma qo’shishda bosqichama-bosqich maydonlarni to’ldiring
            </p>
          </div>
          <div className="form-group">
            <Label htmlFor="name" className="form-label fs-6">
              Nomi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.name && "error"
                }`}
                type="text"
                id="name"
                {...register("name", { required: "Kurs nomini kiriting" })}
              />
              {errors.name && (
                <span className="invalid">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="price" className="form-label fs-6">
              Narxi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.price && "error"
                }`}
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
            <Label htmlFor="month" className="form-label fs-6">
              Muddati (oy)
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.month && "error"
                }`}
                type="number"
                id="name_surname"
                {...register("month", {
                  required: "Kurs davomiyligini kiriting",
                })}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              {errors.month && (
                <span className="invalid">{errors.month.message}</span>
              )}
            </div>
          </div>
          <div className="form-group  ">
            <label className="form-label">
              Kelajak kasblaridagi kursga teng
            </label>
            <RSelect
              options={dropDownList}
              value={selectedContractType}
              onChange={handleChangeContractType}
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
              isLoading={
                initialValue
                  ? updateCourseMutation.isLoading
                  : createCourseMutation.isLoading
              }
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
  initialValue: PropTypes.object,
};
export default AddCourseModal;
