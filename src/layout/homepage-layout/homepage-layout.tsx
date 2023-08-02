import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { AppWrap } from "../app-wrap/app-wrap";
import { Footer, Header, Sidebar } from "../../components";

export const HomepageLayout = () => {
  return (
    <>
      <Sidebar fixed />
      <AppWrap className="s">
        <Header fixed />
        <Outlet />
        <Footer />
      </AppWrap>
    </>
  );
};
