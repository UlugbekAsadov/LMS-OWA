import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({ color, size, className, outline, disabled, ...props }) => {
  const buttonClass = classNames({
    btn: true,
    [`btn-${color}`]: !outline,
    [`btn-outline-${color}`]: outline,
    [`btn-${size}`]: size,
    disabled: disabled,
    [`${className}`]: className,
  });
  return (
    <button className={buttonClass} {...props}>
      {props.children}
    </button>
  );
};
export default Button;

Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
