import classNames from "classnames";
import PropTypes from "prop-types";

export function AppWrap({ className, ...props }) {
  const compClass = classNames({
    "nk-wrap": true,
    [`${className}`]: className,
  });
  return <div className={compClass}>{props.children}</div>;
}

AppWrap.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
