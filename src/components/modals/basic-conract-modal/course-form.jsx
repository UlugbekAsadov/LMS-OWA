import { useEffect, useState } from "react";
import { Label } from "reactstrap";
import Button from "../../button/button";
import { Col, Row } from "../../grid/grid";
import RSelect from "../../react-select/react-select";
import { useQuery } from "react-query";
import { getCoursesQuery } from "../../../react-query/queries/courses.query";
import { useBasicContracts } from "../../../context";

const CourseForm = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const { setValue } = useBasicContracts();
  useQuery({
    queryKey: "courses",
    queryFn: () => getCoursesQuery(),
    onSuccess: (data) => {
      const courses = data.map((course) => {
        return {
          value: course.id,
          label: course.name,
          price: course.price,
          duration: course.month,
        };
      });

      setCourses(courses);
    },
  });

  useEffect(() => {
    setValue("course_id", selectedCourse?.value);
  }, [selectedCourse, setValue]);

  return (
    <Row className="gy-4">
      <Col sm="12">
        <div className="form-group">
          <label className="form-label">Kursni tanlang</label>
          <RSelect
            options={courses}
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
              value={selectedCourse?.price}
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
              value={selectedCourse?.duration}
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
