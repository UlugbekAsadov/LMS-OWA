import classNames from "classnames";
import PropTypes from "prop-types";

export const Block = ({ className, size, ...props }) => {
  const blockClass = classNames({
    "nk-block": true,
    [`nk-block-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};

Block.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
};

export const BlockContent = ({ className, ...props }) => {
  const blockContentClass = classNames({
    "nk-block-content": true,
    [`${className}`]: className,
  });
  return <div className={blockContentClass}>{props.children}</div>;
};

BlockContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const BlockHead = ({ className, size, wide, ...props }) => {
  const blockHeadClass = classNames({
    "nk-block-head": true,
    [`nk-block-head-${size}`]: size,
    [`wide-${wide}`]: wide,
    [`${className}`]: className,
  });
  return <div className={blockHeadClass}>{props.children}</div>;
};

BlockHead.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  wide: PropTypes.string,
  children: PropTypes.node,
};

export const BlockDes = ({ className, ...props }) => {
  const classes = [`nk-block-des${className ? " " + className : ""}`];
  return <div className={classes}>{props.children}</div>;
};

BlockDes.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const BlockTitle = ({ className, page, ...props }) => {
  const classes = [
    `nk-block-title ${page ? "page-title" : "title"}${
      className ? " " + className : ""
    }`,
  ];
  return (
    <>
      {!props.tag ? (
        <h3 className={classes}>{props.children}</h3>
      ) : (
        <props.tag className={classes}>{props.children}</props.tag>
      )}
    </>
  );
};

BlockTitle.propTypes = {
  className: PropTypes.string,
  page: PropTypes.node,
  children: PropTypes.node,
  tag: PropTypes.string,
};
