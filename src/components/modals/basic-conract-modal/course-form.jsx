import { useState } from "react";
import { Label } from "reactstrap";
import Button from "../../button/button";
import { coursesMock } from "../../../utils/mocks";
import { Col, Row } from "../../grid/grid";
import RSelect from "../../react-select/react-select";

const CourseForm = () => {
  const [selectedCourse, setSelectedCourse] = useState(coursesMock[0]);

  return (
    <Row className="gy-4">
      <Col sm="12">
        <div className="form-group">
          <label className="form-label">O’quvchiga vakil kim bo’ladi?</label>
          <RSelect
            options={coursesMock}
            value={selectedCourse}
            onChange={setSelectedCourse}
          />
        </div>
      </Col>

      <Col sm="6">
        <div className="form-group ">
          <Label htmlFor="default-0" className="form-label">
            Narxi
          </Label>
          <div className="form-control-wrap">
            <input
              value={selectedCourse.price}
              className="form-control"
              type="text"
              id="default-0"
              placeholder="Narxi"
              disabled
            />
          </div>
        </div>
      </Col>
      <Col sm="6">
        <div className="form-group ">
          <Label htmlFor="default-0" className="form-label">
            Oy
          </Label>
          <div className="form-control-wrap">
            <input
              value={selectedCourse.duration}
              className="form-control"
              type="text"
              id="default-0"
              placeholder="Oy"
              disabled
            />
          </div>
        </div>
      </Col>

      <div className="d-flex justify-content-center align-items-center gap-2 mt-5 ">
        <Button color="primary" type="submit">
          Saqlash
        </Button>
        <Button className="btn-dim" color="danger">
          Bekor qilish
        </Button>
      </div>
    </Row>
  );
};

export default CourseForm;
