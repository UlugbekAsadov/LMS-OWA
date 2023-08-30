import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./protected-router";
import Layout from "../layout/layout-no-sidebar/layout-no-sidebar";
import Login from "../pages/auth/login";
import Contract from "../pages/contract/contract";
import CoursesList from "../pages/courses/courses-list.jsx";
import ContractsTypeList from "../pages/contracts/contracts-type-list.jsx";
import { USER_ROLES } from "../utils/enums";
import EducationalCentersPage from "../pages/educational-centers/educational-centers-page";
import CreateContract from "../pages/contracts/add-contracts/create-contract.jsx";
import Error403Classic from "../pages/error/403-classic.jsx";
import Error500Classic from "../pages/error/500-classic.jsx";
import Error404Classic from "../pages/error/404-classic.jsx";
import { useQuery } from "react-query";
import { getBootcampInfo } from "../react-query/queries/index.js";
import { GlobalLoader } from "../pages/global-loader/global-loader.jsx";
import EducationalInformation from "../pages/educational-center-about/education-information/educational-information.jsx";
import EducationStaff from "../pages/educational-center-about/education-center-staff/education-staff.jsx";
import EducationCenterStaffs from "../pages/educational-centers/education-center-staffs.jsx";

export const Router = () => {
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["company-info"],
    queryFn: () => getBootcampInfo(),
  });

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute hasAccessRoles={Object.values(USER_ROLES)}>
              <App />
            </ProtectedRoute>
          }
        >
          <Route
            path="educational-center/"
            element={
              <ProtectedRoute hasAccessRoles={[USER_ROLES.SUPER_ADMIN]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<EducationalCentersPage />} />
            <Route
              path="staffs-list/:bootcampId"
              element={<EducationCenterStaffs />}
            />
          </Route>

          <Route
            path="courses-list"
            element={
              <ProtectedRoute hasAccessRoles={[USER_ROLES.COMPANY_OWNER]}>
                <CoursesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="educational-information"
            element={
              <ProtectedRoute hasAccessRoles={[USER_ROLES.COMPANY_OWNER]}>
                <EducationalInformation />
              </ProtectedRoute>
            }
          />
          <Route
            path="educational-staff-information"
            element={
              <ProtectedRoute hasAccessRoles={[USER_ROLES.COMPANY_OWNER]}>
                <EducationStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="contracts-type-list/"
            element={
              <ProtectedRoute hasAccessRoles={[USER_ROLES.COMPANY_OWNER]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ContractsTypeList />} />
            <Route path="add-contract" element={<CreateContract />} />
            <Route
              path="edit-contract/:contractId"
              element={<CreateContract />}
            />
          </Route>

          <Route
            path="contracts/:contractId"
            element={
              <ProtectedRoute
                hasAccessRoles={[
                  USER_ROLES.COMPANY_STAFF,
                  USER_ROLES.COMPANY_OWNER,
                ]}
              >
                <Contract />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="auth-login" element={<Login />}></Route>
          <Route path="no-access" element={<Error403Classic />}></Route>
          <Route path="server-error" element={<Error500Classic />}></Route>
          <Route path="*" element={<Error404Classic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
