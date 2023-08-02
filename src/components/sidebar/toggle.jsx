import PropTypes from "prop-types";
import { Icon } from "../icon/icon";

const Toggle = ({ className, click, icon }) => {
  return (
    <span
      className={className || ""}
      onClick={(ev) => {
        click(ev);
      }}
    >
      <Icon name={icon} />
    </span>
  );
};

Toggle.propTypes = {
  className: PropTypes.string,
  click: PropTypes.func,
  icon: PropTypes.string,
};

export default Toggle;
