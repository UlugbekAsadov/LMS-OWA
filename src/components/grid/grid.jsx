import classnames from "classnames";
import PropType from "prop-types";

export const Col = ({ sm, lg, md, xxl, size, className, ...props }) => {
  var classNames = classnames({
    [`col-sm-${sm}`]: sm,
    [`col-lg-${lg}`]: lg,
    [`col-md-${md}`]: md,
    [`col-xxl-${xxl}`]: xxl,
    [`col-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={classNames}>{props.children}</div>;
};

Col.propTypes = {
  sm: PropType.string,
  lg: PropType.string,
  md: PropType.string,
  xxl: PropType.string,
  size: PropType.string,
  className: PropType.string,
  children: PropType.node,
};

export const Row = ({ className, ...props }) => {
  const rowClass = classnames({
    row: true,
    [`${className}`]: className,
  });
  return <div className={rowClass}>{props.children}</div>;
};

Row.propTypes = {
  className: PropType.string,
  children: PropType.node,
};
