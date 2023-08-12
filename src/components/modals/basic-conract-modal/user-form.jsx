import { forwardRef, useEffect, useState } from "react";
import { Label, Row, Spinner } from "reactstrap";
import DatePicker from "react-datepicker";
import { Col } from "reactstrap";
import { Icon } from "../../icon/icon";
import RSelect from "../../react-select/react-select";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import {
  getCitiesQuery,
  getPINFLQuery,
  // getPINFLQuery,
  getRegionsQuery,
} from "../../../react-query/queries";
import { useBasicContracts } from "../../../context";
import { convertDate } from "../../../utils/functions";
// eslint-disable-next-line react/display-name
const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
));

ExampleCustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

const UserForm = ({ isAutomatic, data }) => {
  const [bornDate, setBornDate] = useState(new Date("01/01/2000"));
  const [passportExpireDate, setPassportExpireDate] = useState(
    new Date("01/01/2010")
  );
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isFetchingPINFL, setIsFetchingPINFL] = useState(false);
  const [hasError, setHasError] = useState(true);
  const { register, watch, setValue } = useBasicContracts();

  const pinflValue = watch("pin");

  useQuery({
    queryKey: ["PINFL"],
    queryFn: () => getPINFLQuery(pinflValue),
    enabled: false,
    onSuccess: () => setIsFetchingPINFL(false),
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

    enabled: pinflValue.length === 14
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
    enabled: !!selectedProvince
  });

  const handleChangeProvince = (value) => {
    setSelectedCity(null);
    setSelectedProvince(value);
  };

  const handleChangeCity = (value) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    setHasError(false);
    if (pinflValue.length === 14) {
      setIsFetchingPINFL(true);
    }
  }, [pinflValue]);


  useEffect(() => {
    setValue("birthday", convertDate(bornDate));
  }, [bornDate, setValue]);

  useEffect(() => {
    setValue("document_given_date", convertDate(passportExpireDate));
  }, [passportExpireDate, setValue]);

  useEffect(() => {
    setValue("region_id", selectedProvince?.id);
  }, [selectedProvince, setValue]);

  useEffect(() => {
    setValue("district_id", selectedCity?.id);
  }, [selectedCity, setValue]);

  return (
    <Row className="gy-2">
      <Col sm="12">
        <div className="form-group mt-3">
          <Label htmlFor="default-0" className="form-label">
            PINFL
          </Label>
          <div className="form-control-wrap">
            <input
              className={`form-control ${hasError ? "error" : null}`}
              type="text"
              id="default-0"
              {...register("pin", { required: true })}
              placeholder="Jismoniy shaxsning shaxsiy identifikatsion raqami"
              maxLength="14"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            {hasError && (
              <span className="invalid">{`Ma'lumotlar topilmadi`}</span>
            )}
          </div>
        </div>
      </Col>

      {isFetchingPINFL && (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>
      )}

      {Boolean(data) && !isFetchingPINFL && (
        <>
          <Col sm="4">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Pasport seriyasi
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control text-uppercase"
                  type="text"
                  id="default-0"
                  placeholder="AB"
                  maxLength="2"
                  disabled={isAutomatic}
                  {...register("document_serial", { required: true })}
                />
              </div>
            </div>
          </Col>
          <Col sm="8">
            <div className="form-group">
              <Label htmlFor="default-0" className="form-label">
                Pasport raqami
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  type="text"
                  id="default-0"
                  placeholder="1234567"
                  {...register("document_number", { required: true })}
                  disabled={isAutomatic}
                  maxLength="7"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          </Col>

          <Col sm="12">
            <div className="form-group">
              <Label> Tug’ilgan sanasi</Label>
              <div className="form-control-wrap">
                <div className="form-icon form-icon-left">
                  <Icon name="calendar" />
                </div>
                <DatePicker
                  selected={bornDate}
                  className="form-control date-picker"
                  onChange={setBornDate}
                  readOnly={isAutomatic}
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </div>
          </Col>

          <Col sm="8">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Berilgan joyi
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  disabled={isAutomatic}
                  type="text"
                  id="default-0"
                  placeholder="Berilgan joyi"
                  {...register("document_given", { required: true })}
                />
              </div>
            </div>
          </Col>
          <Col sm="4">
            <div className="form-group">
              <Label> Berilgan sanasi</Label>
              <div className="form-control-wrap">
                <div className="form-icon form-icon-left">
                  <Icon name="calendar" />
                </div>
                <DatePicker
                  selected={passportExpireDate}
                  className="form-control date-picker"
                  onChange={setPassportExpireDate}
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </div>
          </Col>

          <Col sm="4">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Ismi
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  disabled={isAutomatic}
                  {...register("first_name", { required: true })}
                  type="text"
                  id="default-0"
                  placeholder="Ismi"
                />
              </div>
            </div>
          </Col>
          <Col sm="4">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Familiya
              </Label>
              <div className="form-control-wrap">
                <input
                  disabled={isAutomatic}
                  className="form-control"
                  {...register("last_name", { required: true })}
                  type="text"
                  id="default-0"
                  placeholder="Familiya"
                />
              </div>
            </div>
          </Col>
          <Col sm="4">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Otasining ismi
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  {...register("middle_name", { required: true })}
                  type="text"
                  id="default-0"
                  placeholder="Otasining ismi"
                  disabled={isAutomatic}
                />
              </div>
            </div>
          </Col>

          <Col sm="6">
            <div className="form-group">
              <label className="form-label">Select Default</label>
              <RSelect
                options={provinces}
                value={selectedProvince}
                onChange={handleChangeProvince}
                isDisabled={isAutomatic}
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
                isDisabled={isAutomatic}
              />
            </div>
          </Col>

          <Col sm="12">
            <div className="form-group ">
              <Label htmlFor="default-0" className="form-label">
                Yashash manzili
              </Label>
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  type="text"
                  id="default-0"
                  placeholder="Yashash manzili"
                  {...register("address", { required: true })}
                />
              </div>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

UserForm.propTypes = {
  isAutomatic: PropTypes.bool,
  data: PropTypes.any,
};

export default UserForm;
