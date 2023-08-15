import { Col, Label, Modal, ModalBody, Row } from "reactstrap";
import PropTypes from "prop-types";
import { Icon } from "../../icon/icon.jsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";
import { InputMask } from "primereact/inputmask";
import { useQuery } from "react-query";
import {
  getCitiesQuery,
  getRegionsQuery,
} from "../../../react-query/queries/contracts.query.js";
import { getBankQuery } from "../../../react-query/queries/bank.query.js";
import { ERROR_MESSAGES } from "../../../utils/enums/error-messages.enum.js";

const AddBootcampsModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [invalidBank, setInvalidBank] = useState(false);

  const bank_code = watch("bank_code");

  const handleChangeProvince = (value) => {
    setValue("region", value.value);
    setSelectedProvince(value);
  };

  const handleChangeCity = (value) => {
    setValue("city", value.value);
    setSelectedCity(value);
  };

  const handleSubmitForm = (values) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    values.phone_number = values.phone_number.replace(regex, "$1$2$3$4");
    console.log({ values, errors });
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
          value: region.name_lt,
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
        return { value: cities.name_lt, id: cities.id, label: cities.name_lt };
      });

      setCities(cities);
    },
    enabled: !!selectedProvince,
  });

  useEffect(() => {
    setInvalidBank(false);
    if (bank_code?.length === 5) {
      bankQuery.refetch();
    }
  }, [bank_code]);

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
            <Label htmlFor="phone_number" className="form-label fs-6">
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
            <Label htmlFor="name_surname" className="form-label fs-6">
              Yuridik nomi
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.first_name && "error"
                }`}
                type="text"
                id="name_surname"
                {...register("first_name", {
                  required: "Yuridik nomini kiriting",
                })}
              />
              {errors.first_name && (
                <span className="invalid">{errors.first_name.message}</span>
              )}
            </div>
          </div>
          <Row className="form-group">
            <Col>
              <div className="form-group">
                <Label htmlFor="name_surname" className="form-label fs-6">
                  Bank kodi
                </Label>
                <div className="form-control-wrap">
                  <input
                    className={`form-control form-control-lg ${
                      (errors.bank_code || invalidBank) && "error"
                    }`}
                    type="text"
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
                <label className="form-label">Bank</label>
                <input
                  className={`form-control form-control-lg`}
                  type="text"
                  disabled
                  placeholder={
                    bankQuery.isLoading ? "Yuklanmoqda" : "Bank nomi"
                  }
                  {...register("bank_name")}
                />
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
                <Label htmlFor="name_surname" className="form-label fs-6">
                  Hisob raqami
                </Label>
                <div className="form-control-wrap">
                  <input
                    className={`form-control form-control-lg ${
                      errors.account && "error"
                    }`}
                    type="text"
                    id="name_surname"
                    {...register("account", {
                      required: "Hisob raqamini kiriting",
                    })}
                  />
                  {errors.account && (
                    <span className="invalid">{errors.account.message}</span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <Label htmlFor="director_name_long" className="form-label fs-6">
              Direktor ismi (to’liq)
            </Label>
            <div className="form-control-wrap">
              <input
                className={`form-control form-control-lg ${
                  errors.director_name_long && "error"
                }`}
                type="text"
                placeholder="Sigayev Edgar Xushnazarovich"
                id="director_name_long"
                {...register("director_name_long", {
                  required: "Direktor ismini kiriting",
                })}
              />
              {errors.director_name_long && (
                <span className="invalid">
                  {errors.director_name_long.message}
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
            <label className="form-label" htmlFor="message">
              Qo’shimcha ma’lumot
            </label>
            <div className="form-control-wrap">
              <textarea
                className="form-control form-control-sm"
                id="message"
                placeholder="Misol uchun qanaqadir kelishuv yoki eslatma yozib qo’yish mumkin. Faqat administrator ko’rishi uchun mo’ljallangan bu joy"
                {...register("message")}
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
              Saqlash
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
