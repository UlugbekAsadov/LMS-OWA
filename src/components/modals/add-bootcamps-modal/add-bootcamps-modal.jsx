import { Col, Label, Modal, ModalBody, Row, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { Icon } from "../../icon/icon.jsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";
import { InputMask } from "primereact/inputmask";
import { useMutation, useQuery } from "react-query";
import {
  getCitiesQuery,
  getRegionsQuery,
} from "../../../react-query/queries/contracts.query.js";
import { getBankQuery } from "../../../react-query/queries/bank.query.js";
import {
  ERROR_MESSAGES,
  ERROR_MESSAGE_TRANSLATIONS,
} from "../../../utils/enums/error-messages.enum.js";
import { addBootcampMutationFn } from "../../../react-query/mutations/bootcamp.mutation.js";

const AddBootcampsModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [invalidBank, setInvalidBank] = useState(false);

  const bank_code = watch("bank_code");

  const handleChangeProvince = (value) => {
    setValue("region_id", value.value);
    setSelectedProvince(value);
  };

  const handleChangeCity = (value) => {
    setValue("district_id", value.value);
    setSelectedCity(value);
  };

  const bankQuery = useQuery({
    queryKey: "bank_info",
    queryFn: () => getBankQuery(bank_code),
    enabled: false,
    onSuccess: (data) => {
      if (data?.error?.message === ERROR_MESSAGES.BANK_NOT_FOUND) {
        setValue("bank_name", null);
        return setInvalidBank(true);
      }

      setValue("bank_name", data.data.bank_name);
    },
  });

  useQuery({
    queryKey: "regions",
    queryFn: () => getRegionsQuery(),
    onSuccess: (data) => {
      const provinces = data.map((region) => {
        return {
          value: region.id,
          id: region.region_id,
          label: region.name_lt,
        };
      });

      setProvinces(provinces);
    },
  });

  useQuery({
    queryKey: [`cities-${selectedProvince?.id}`],
    queryFn: () => getCitiesQuery(selectedProvince?.id),
    onSuccess: (data) => {
      const cities = data.map((cities) => {
        return { value: cities.id, id: cities.id, label: cities.name_lt };
      });

      setCities(cities);
    },
    enabled: !!selectedProvince,
  });

  const addBootcampMutation = useMutation({
    mutationKey: "add-bootcamp-mutation",
    mutationFn: (config) => addBootcampMutationFn(config),
    onSuccess: (data) => {
      if (
        data?.error?.message === ERROR_MESSAGES.COMPANY_ALREADY_EXISTS_IN_USER
      ) {
        return setError("name_brand", {
          message: [ERROR_MESSAGE_TRANSLATIONS[data.error.message]],
        });
      }
    },
  });

  useEffect(() => {
    setInvalidBank(false);
    if (bank_code?.length === 5) {
      bankQuery.refetch();
    }
  }, [bank_code]);

  const handleSubmitForm = (values) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    values.phone = values.phone.replace(regex, "$1$2$3$4");
    console.log({ values, errors });

    const config = {
      method: "POST",
      body: JSON.stringify(values),
    };
    addBootcampMutation.mutate(config);
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody className={"gap-20"}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <span className="close cursor-pointer" onClick={onClose}>
            <Icon name="cross-sm"></Icon>
          </span>
          <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
            <h2 className="fw-bold  fs-3">Yangi ta’lim muassasasi qo’shish</h2>
            <p className="fs-7 text-center">
              Keyinchalik shartnomada ko’rsatilishi kerak bo’lgan yuridik shaxs
              haqidagi ma’lumotlarni va rekvizitlarni to’ldirib chiqish kerak
            </p>
          </div>
          <div className="form-group">
            <Label htmlFor="name_brand" className="form-label fs-6">
              O’quv markaz nomi (brend)
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.name_brand && "error"
                }`}
                type="text"
                id="name_brand"
                {...register("name_brand", {
                  required: "O’quv markaz nomini kiriting",
                })}
              />
              {errors.name_brand && (
                <span className="invalid">{errors.name_brand.message}</span>
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
                  errors.phone && "error"
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
            <Label htmlFor="name_legal" className="form-label fs-6">
              Yuridik nomi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.name_legal && "error"
                }`}
                type="text"
                id="name_legal"
                {...register("name_legal", {
                  required: "Yuridik nomini kiriting",
                })}
              />
              {errors.name_legal && (
                <span className="invalid">{errors.name_legal.message}</span>
              )}
            </div>
          </div>
          <Row className="form-group">
            <Col>
              <div className="form-group">
                <Label htmlFor="bank_code" className="form-label fs-6">
                  Bank kodi
                </Label>
                <div className="form-control-wrap">
                  <input
                    className={`form-control form-control-lg ${
                      (errors.bank_code || invalidBank) && "error"
                    }`}
                    type="text"
                    id="bank_code"
                    maxLength={5}
                    {...register("bank_code", {
                      required: "Bank kodini kiriting",
                      maxLength: 5,
                    })}
                  />
                  {errors.bank_code && (
                    <span className="invalid">{errors.bank_code.message}</span>
                  )}
                  {invalidBank && (
                    <span className="invalid">Bank Topilmadi</span>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div className="form-group  ">
                <Label htmlFor="bank_name" className="form-label fs-6">
                  Bank nomi
                </Label>
                <input
                  className={`form-control form-control-lg`}
                  type="text"
                  disabled
                  placeholder={
                    bankQuery.isLoading ? "Yuklanmoqda" : "Bank nomi"
                  }
                  {...register("bank_name", { required: "Bank nomi majburiy" })}
                />
                {errors.bank_name && (
                  <span className="invalid">{errors.bank_name.message}</span>
                )}
              </div>
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <div className="form-group">
                <Label htmlFor="inn" className="form-label fs-6">
                  INN (STIR)
                </Label>
                <div className="form-control-wrap">
                  <input
                    className={`form-control form-control-lg ${
                      errors.inn && "error"
                    }`}
                    type="text"
                    id="inn"
                    {...register("inn", {
                      required: "INNni kiriting",
                    })}
                  />
                  {errors.inn && (
                    <span className="invalid">{errors.inn.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Label htmlFor="bank_account" className="form-label fs-6">
                  Hisob raqami
                </Label>
                <div className="form-control-wrap">
                  <input
                    className={`form-control form-control-lg ${
                      errors.bank_account && "error"
                    }`}
                    type="text"
                    id="bank_account"
                    {...register("bank_account", {
                      required: "Hisob raqamini kiriting",
                    })}
                  />
                  {errors.bank_account && (
                    <span className="invalid">
                      {errors.bank_account.message}
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <Label htmlFor="director_name_full" className="form-label fs-6">
              Direktor ismi (to’liq)
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.director_name_full && "error"
                }`}
                type="text"
                placeholder="Sigayev Edgar Xushnazarovich"
                id="director_name_full"
                {...register("director_name_full", {
                  required: "Direktor ismini kiriting",
                })}
              />
              {errors.director_name_full && (
                <span className="invalid">
                  {errors.director_name_full.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="director_name_short" className="form-label fs-6">
              Direktor ismi (qisqa)
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.director_name_short && "error"
                }`}
                type="text"
                placeholder="Misol uchun: Sigayev E.X."
                id="director_name_short"
                {...register("director_name_short", {
                  required: "Direktor ismini kiriting",
                })}
              />
              {errors.director_name_short && (
                <span className="invalid">
                  {errors.director_name_short.message}
                </span>
              )}
            </div>
          </div>
          <Row className="form-group">
            <Col sm="6">
              <div className="form-group">
                <label className="form-label">Select Default</label>
                <RSelect
                  options={provinces}
                  value={selectedProvince}
                  onChange={handleChangeProvince}
                />
              </div>
            </Col>

            <Col sm="6">
              <div className="form-group">
                <label className="form-label">Select Default</label>
                <RSelect
                  options={cities}
                  value={selectedCity}
                  onChange={handleChangeCity}
                  isDisabled={!selectedProvince}
                />
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <label className="form-label" htmlFor="note">
              Qo’shimcha ma’lumot
            </label>
            <div className="form-control-wrap">
              <textarea
                className="form-control form-control-sm"
                id="note"
                placeholder="Misol uchun qanaqadir kelishuv yoki eslatma yozib qo’yish mumkin. Faqat administrator ko’rishi uchun mo’ljallangan bu joy"
                {...register("note")}
              />
            </div>
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
              {addBootcampMutation.isLoading ? (
                <Spinner size="sm" color="light" />
              ) : (
                "Saqlash"
              )}
            </Button>
          </Col>
        </form>
      </ModalBody>
    </Modal>
  );
};

AddBootcampsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AddBootcampsModal;
