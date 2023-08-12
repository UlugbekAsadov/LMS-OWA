import {Col, Label, Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";
import {Icon} from "../../icon/icon.jsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import RSelect from "../../react-select/react-select.jsx";
import Button from "../../button/button.jsx";


const AddStaff = ({isOpen, onClose}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const mockDataRol = [
        { value: "blues", label: "Blues" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "orchestra", label: "Orchestra" },
    ]

    useEffect(() => {
        setCities(mockDataRol)
    }, [])

    const handleChangeCity = (value) => {
        console.log(value.value)
        setSelectedCity(value);
    };

    const handleSubmitForm = (values) => {
        console.log({values, errors});
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <ModalBody className={'gap-20'}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                      <span className="close cursor-pointer" onClick={onClose}>
                        <Icon name="cross-sm"></Icon>
                      </span>
                    <div className="py-4 w-100 d-flex flex-column align-items-center justify-content-center form-group">
                        <h2 className="fw-bold  fs-3">O’quv markaz uchun xodim qo’shish</h2>
                        <p className="fs-7">
                            Quyidagi maydonlarni to’ldirib chiqing
                        </p>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="default-0" className="form-label fs-6">
                            Ismi va familiyasi
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                id="default-0"
                                {...register("first_name")}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="default-0" className="form-label fs-6">
                            Telefon raqami
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                id="default-0"
                                {...register("first_number")}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="default-0" className="form-label fs-6">
                            Parol
                        </Label>
                        <div className="form-control-wrap">
                                <span
                                    onClick={() => setIsPasswordVisible((prevVal) => !prevVal)}
                                    className={`form-icon lg form-icon-right passcode-switch  cursor-pointer ${
                                        isPasswordVisible ? "is-hidden" : "is-shown"
                                    }`}
                                >
                                  <Icon name="eye" className="passcode-icon icon-show fs-4"></Icon>

                                  <Icon
                                      name="eye-off"
                                      className="passcode-icon icon-hide fs-4">
                                  </Icon>
                             </span>
                            <input
                                autoComplete="new-password"
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "This field is required",
                                })}
                                className={`form-control-lg form-control  ${
                                    isPasswordVisible ? "is-hidden" : "is-shown"
                                }`}
                            />
                            {errors.passcode && (
                                <span className="invalid">{errors.passcode.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group  ">
                        <label className="form-label">Rol</label>
                        <RSelect
                            options={cities}
                            value={selectedCity}
                            onChange={handleChangeCity}
                        />
                    </div>
                    <Col sm="6" className={'w-100 d-flex align-items-center justify-content-center '}>
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
    )
}

AddStaff.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};
export default AddStaff