import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

export const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{title || "Default Title"}</title>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
};
