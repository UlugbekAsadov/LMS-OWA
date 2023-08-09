import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./protected-router";
import Layout from "../layout/layout-no-sidebar/layout-no-sidebar";
import Login from "../pages/auth/login";
import BasicContracts from "../pages/basic-contract/basic-contract";
import FutureProfessionsContract from "../pages/future-professions-contract/future-professions-contract";
import CoursesList from "../pages/courses/courses-list.jsx";
import ContractsTypeList from "../pages/contracts/contracts-type-list.jsx";
import EducationalCentersPage from "../pages/educational-centers/educational-centers-page.jsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth-login" element={<Login />} />
{/* 
        <Route
          path="/"
          element={
            <ProtectedRoute hasAccessRoles={["BASIC"]}>
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="basic-contract" element={<BasicContracts />} />
          <Route
            path="educational-center"
            element={<EducationalCentersPage />}
          />
          <Route
            path="grand-contract"
            element={<FutureProfessionsContract />}
          />
          <Route path="courses-list" element={<CoursesList />} />
          <Route path="contracts-type-list" element={<ContractsTypeList />} />
        </Route> */}

        {/* 
        <Route path="/" element={<Layout />}>
          <Route path="auth-success" element={<Success />}></Route>
          <Route path="auth-reset" element={<ForgotPassword />}></Route>
          <Route path="auth-register" element={<Register />}></Route> 
           <Route path="errors">
            <Route path="404-modern" element={<Error404Modern />}></Route>
            <Route path="404-classic" element={<Error404Classic />}></Route>
            <Route path="504-modern" element={<Error504Modern />}></Route>
            <Route path="504-classic" element={<Error504Classic />}></Route>
          </Route>
          <Route path="*" element={<Error404Modern />}></Route> 
        </Route>
          */}
      </Routes>
    </BrowserRouter>
  );
};
