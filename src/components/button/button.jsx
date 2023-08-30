import classNames from "classnames";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

const Button = ({
  color,
  size,
  className,
  outline,
  disabled,
  isLoading,
  ...props
}) => {
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
      {isLoading ? <Spinner size="sm" color="light" /> : props.children}
    </button>
  );
};
export { Button };

Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};
