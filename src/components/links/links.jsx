import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon } from "../icon/icon";

export const LinkList = ({ ...props }) => {
  const listClasses = classNames({
    "link-list": !props.opt,
    "link-list-opt": props.opt,
    [`${props.className}`]: props.className,
  });
  return <ul className={listClasses}>{props.children}</ul>;
};

LinkList.propTypes = {
  opt: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export const LinkItem = ({ ...props }) => {
  return (
    <li>
      {props.tag !== "a" ? (
        <Link to={props.link} {...props}>
          {props.icon ? <Icon name={props.icon} /> : null}{" "}
          <span>{props.text || props.children}</span>
        </Link>
      ) : (
        <a href={props.link} onClick={(ev) => ev.preventDefault()}>
          {props.icon ? <Icon name={props.icon} /> : null}{" "}
          <span>{props.text || props.children}</span>
        </a>
      )}
    </li>
  );
};

LinkItem.propTypes = {
  link: PropTypes.string,
  tag: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};
