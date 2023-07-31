import { Card } from "reactstrap";
import PropTypes from "prop-types";

export const PreviewCard = ({ className, bodyClass, ...props }) => {
  return (
    <Card className={`card-preview ${className ? className : ""}`}>
      <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>
        {props.children}
      </div>
    </Card>
  );
};

PreviewCard.propTypes = {
  className: PropTypes.string,
  bodyClass: PropTypes.string,
  children: PropTypes.node,
};
