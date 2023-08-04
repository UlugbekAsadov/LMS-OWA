import Select from "react-select";
import PropTypes from "prop-types";

const RSelect = ({ ...props }) => {
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${props.className || ""}`}
        classNamePrefix="react-select"
        {...props}
      />
    </div>
  );
};

RSelect.propTypes = {
  className: PropTypes.string,
};

export default RSelect;
