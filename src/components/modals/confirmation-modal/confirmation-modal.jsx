import PropTypes from "prop-types";
import { Button, Col, Modal, ModalBody } from "reactstrap";

export const ConfirmationModal = ({
  title,
  cancelButtonTitle,
  cancelButtonFn,
  confirmButtonTitle,
  confirmButtonFn,
}) => {
  return (
    <Modal>
      <ModalBody className={"gap-20"}>
        <h2>{title}</h2>
        <Col
          sm="6"
          className={"w-100 d-flex align-items-center justify-content-center "}
        >
          <Button
            size="lg"
            className="btn-block w-20 mb-4"
            color="primary"
            onClick={confirmButtonFn}
          >
            {confirmButtonTitle}
          </Button>
        </Col>
        <Col
          sm="6"
          className={"w-100 d-flex align-items-center justify-content-center "}
        >
          <Button
            size="lg"
            className="btn-block w-20 mb-4"
            onClick={cancelButtonFn}
            color="primary"
          >
            {cancelButtonTitle}
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  cancelButtonTitle: PropTypes.string,
  cancelButtonFn: PropTypes.func,
  confirmButtonTitle: PropTypes.string,
  confirmButtonFn: PropTypes.func,
};
