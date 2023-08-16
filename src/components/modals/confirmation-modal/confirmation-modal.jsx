import PropTypes from "prop-types";
import { Button, Col, Modal, ModalBody } from "reactstrap";
import { Icon } from "../../icon/icon.jsx";

export const ConfirmationModal = ({
                                    title,
                                    cancelButtonTitle,
                                    confirmButtonTitle,
                                    confirmButtonFn,
                                    isOpen, onClose,
                                  }) => {

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
      <ModalBody className={"gap-20"}>
         <span className="close cursor-pointer" onClick={onClose}>
            <Icon name="cross-sm"></Icon>
          </span>
        <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
          <h2 className="fw-bold  fs-1">{title}</h2>
        </div>
        <Col
          sm="6"
          className={"w-100 d-flex align-items-center justify-content-center gap-5 "}
        >
          <Button
            size="lg"
            className="btn-block w-20 mb-4"
            color="primary"
            onClick={confirmButtonFn}
          >
            {confirmButtonTitle}
          </Button>
          <Button
            size="lg"
            className="btn-block border-0 w-20 mb-4 bg-danger-dim text-danger"
            onClick={onClose}
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

};
