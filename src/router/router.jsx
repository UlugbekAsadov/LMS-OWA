import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./protected-router";
import Layout from "../layout/layout-no-sidebar/layout-no-sidebar";
import Login from "../pages/auth/login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute hasAccessRoles={["BASIC"]}>
              <App />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Layout />}>
          {/* <Route path="auth-success" element={<Success />}></Route>
          <Route path="auth-reset" element={<ForgotPassword />}></Route>
          <Route path="auth-register" element={<Register />}></Route> */}
          <Route path="auth-login" element={<Login />}></Route>

          {/* <Route path="errors">
            <Route path="404-modern" element={<Error404Modern />}></Route>
            <Route path="404-classic" element={<Error404Classic />}></Route>
            <Route path="504-modern" element={<Error504Modern />}></Route>
            <Route path="504-classic" element={<Error504Classic />}></Route>
          </Route>
          <Route path="*" element={<Error404Modern />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
