import { PreviewCard } from "../../../../components/index.js";
import { Col } from "reactstrap";

const RightPage = () => {
  return (
    <Col md={"4"}>
      <PreviewCard className={"h-100"}>
        <p className={"text-center pb-2 text-gray fs-14 lh-23 fw-400"}>
          LONG DESCRIPTION
        </p>
        <ul>
          <li className={"w-100% d-flex flex-grow-1 justify-content-between"}>
            <span className={"w-60"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, sit?
            </span>
            <b>Name1</b>
          </li>
        </ul>
      </PreviewCard>
    </Col>
  );
};

export default RightPage;
