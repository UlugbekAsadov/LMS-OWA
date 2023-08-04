import PropTypes from "prop-types";
import { Head } from "../head/head.layout";

export const Content = ({ ...props }) => {
  return (
    <>
      <Head title={props.title} />
      <div className="nk-content">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              {!props.page ? props.children : null}
              {props.page === "component" ? (
                <div className="components-preview wide-md mx-auto">
                  {props.children}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  page: PropTypes.string,
  title: PropTypes.string,
};
