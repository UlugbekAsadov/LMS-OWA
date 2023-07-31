import { Outlet } from "react-router-dom";
import { Head } from "../head/head.layout";
import PropTypes from "prop-types";

const Layout = ({ title }) => {
  return (
    <>
      <Head title={!title && "Loading"} />
      <div className="nk-app-root">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;

Layout.propTypes = {
  title: PropTypes.string,
};
