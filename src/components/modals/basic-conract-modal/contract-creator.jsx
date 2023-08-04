import { useState } from "react";
import { Alert, Col, Row } from "reactstrap";
import { Icon } from "../../icon/icon";
import UserForm from "./user-form";

const RADIOS = [
  {
    id: 1,
    title: "Ma’lumotlarni avtomatik to’ldirish",
  },
  {
    id: 2,
    title: "Qo’lda kiritish ",
  },
];

const ContractCreator = () => {
  const [checkedRadio, setCheckedRadio] = useState(1);
  const isAutomaticFill = checkedRadio === 1;
  const renderRadios = RADIOS.map((radio) => (
    <Col md="5" sm="3" key={radio.id}>
      <div className="preview-block">
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id={`customRadio${radio.id}`}
            name="customRadio"
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

  return (
    <div>
      <Alert color="primary alert-icon">
        <Icon name="alert-circle" />
        Shartnoma tuzuvchi shaxs 18 yoshga to’lgan bo’lishi kerak. Agar o’quvchi
        yosh bo’lsa shartnoma ota-onasi yoki vakili orqali tuziladi.
      </Alert>

      <Row className="gy-4">{renderRadios}</Row>

      <UserForm
        isAutomatic={isAutomaticFill}
        data={isAutomaticFill ? null : { 1: 1 }}
      />
    </div>
  );
};

export default ContractCreator;
