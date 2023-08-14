import PropTypes from "prop-types";
import { Helmet, HelmetProvider  } from "react-helmet-async";

export const Head = ({ title }) => {
  return (
      <HelmetProvider>
          <Helmet>
            <title>{title || "Default Title"}</title>
          </Helmet>
      </HelmetProvider>
  );
};

Head.propTypes = {
  title: PropTypes.string,
};
