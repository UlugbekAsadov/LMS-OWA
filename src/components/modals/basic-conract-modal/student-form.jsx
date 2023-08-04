import { forwardRef, useMemo, useState } from "react";
import { Label } from "reactstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { representativeMock } from "../../../utils/mocks";
import { Icon } from "../../icon/icon";
import { Col, Row } from "../../grid/grid";
import RSelect from "../../react-select/react-select";

const RADIOS = [
  {
    id: 3,
    title: "Shartnoma tuzuvchining o’zi",
  },
  {
    id: 4,
    title: "Boshqa",
  },
];

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

const StudentForm = () => {
  const [checkedRadio, setCheckedRadio] = useState(RADIOS[0].id);
  const [bornDate, setBornDate] = useState(new Date());
  const [selectedRepresentativ, setSelectedRepresentativ] = useState(
    representativeMock[0]
  );

  const renderRadios = RADIOS.map((radio) => (
    <Col md="5" sm="3" key={radio.id}>
      <div className="preview-block">
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id={`customRadio${radio.id}`}
            name={`customRadio${radio.id}`}
            className="custom-control-input"
            checked={radio.id === checkedRadio}
            onChange={setCheckedRadio.bind(null, radio.id)}
          />
          <label
            className="custom-control-label"
            htmlFor={`customRadio${radio.id}`}
          >
            {radio.title}
          </label>
        </div>
      </div>
    </Col>
  ));

  const renderForm = useMemo(() => {
    switch (checkedRadio) {
      case 3:
        return (
          <>
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
                    readOnly={true}
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
                    disabled
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
                    disabled
                    className="form-control"
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
                    type="text"
                    id="default-0"
                    placeholder="Otasining ismi"
                    disabled
                  />
                </div>
              </div>
            </Col>
          </>
        );

      default:
        return (
          <>
            <Col sm="6">
              <div className="form-group">
                <label className="form-label">
                  O’quvchiga vakil kim bo’ladi?
                </label>
                <RSelect
                  options={representativeMock}
                  value={selectedRepresentativ}
                  onChange={setSelectedRepresentativ}
                />
              </div>
            </Col>
            <Col sm="6">
              <div className="form-group">
                <Label>Tug’ilgan sanasi</Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-left">
                    <Icon name="calendar" />
                  </div>
                  <DatePicker
                    selected={bornDate}
                    className="form-control date-picker"
                    onChange={setBornDate}
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
                    className="form-control"
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
                    type="text"
                    id="default-0"
                    placeholder="Otasining ismi"
                  />
                </div>
              </div>
            </Col>
          </>
        );
    }
  }, [checkedRadio, selectedRepresentativ, bornDate]);

  return (
    <div>
      <Row className="gy-4">{renderRadios}</Row>
      <Row className="gy-2 mt-2">{renderForm}</Row>
    </div>
  );
};

export default StudentForm;
