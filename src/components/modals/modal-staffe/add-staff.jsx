import {Label, Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";

const AddStaffe = ({isOpen, onClose}) => {

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <ModalBody>
            <form>
                <Label> Tug’ilgan sanasi</Label>
            </form>
            </ModalBody>
        </Modal>
    )
}

AddStaffe.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};
export default AddStaffe