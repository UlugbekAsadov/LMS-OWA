import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import { ProtectedRoute } from './protected-router';
import Layout from '../layout/layout-no-sidebar/layout-no-sidebar';
import Login from '../pages/auth/login';
import BasicContracts from '../pages/basic-contract/basic-contract';
import FutureProfessionsContract from '../pages/future-professions-contract/future-professions-contract';
import CoursesList from '../pages/courses/courses-list.jsx';
import ContractsTypeList from '../pages/contracts/contracts-type-list.jsx';
import { USER_ROLES } from '../utils/enums';
import EducationalCentersPage from '../pages/educational-centers/educational-centers-page';
import StaffsPage from '../pages/educational-centers/staffs/staffs-page';
import CreateContract from '../pages/contracts/add-contracts/create-contract.jsx';
import Error403Classic from '../pages/error/403-classic.jsx';
import Error500Classic from '../pages/error/500-classic.jsx';
import Error404Classic from '../pages/error/404-classic.jsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth-login" />} />

        <Route path="/basic-contracts" element={<BasicContracts />} />
        <Route
          path="/educational-center"
          element={
            <ProtectedRoute hasAccessRoles={[USER_ROLES.ADMIN]}>
              <EducationalCentersPage />{' '}
            </ProtectedRoute>
          }
        />
        <Route path="/staffs-list" element={<StaffsPage />} />
        <Route path="/grand-contract" element={<FutureProfessionsContract />} />
        <Route path="/courses-list" element={<CoursesList />} />
        <Route path="/contracts-type-list" element={<ContractsTypeList />} />
        <Route
          path="/contracts-type-list/add-contract"
          element={<CreateContract />}
        />

        <Route path="/auth-login" element={<Login />} />
        <Route path="/no-access" element={<Error403Classic />} />
        <Route path="/server-error" element={<Error500Classic />} />
        <Route path="*" element={<Error404Classic />} />
      </Routes>
    </BrowserRouter>
  );
};
