import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from '../App';
import {ProtectedRoute} from './protected-router';
import Layout from '../layout/layout-no-sidebar/layout-no-sidebar';
import Login from '../pages/auth/login';
import BasicContracts from '../pages/basic-contract/basic-contract';
import FutureProfessionsContract from '../pages/future-professions-contract/future-professions-contract';
import CoursesList from '../pages/courses/courses-list.jsx';
import ContractsTypeList from '../pages/contracts/contracts-type-list.jsx';
import EducationalCentersPage from '../pages/educational-centers/educational-centers-page.jsx';
import StaffsPage from '../pages/educational-centers/staffs/staffs-page.jsx';
import CreateContracts from "../pages/contracts/add-contracts/create-contracts.jsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute hasAccessRoles={['BASIC']}>
              <App/>
            </ProtectedRoute>
          }
        >
          <Route path="basic-contract" element={<BasicContracts/>}/>
          <Route path="educational-center" element={<EducationalCentersPage/>}/>
          <Route path="staffs-list" element={<StaffsPage/>}/>
          <Route path="grand-contract" element={<FutureProfessionsContract/>}/>
          <Route path="courses-list" element={<CoursesList/>}/>
          <Route path="contracts-type-list" element={<ContractsTypeList/>} />
          <Route path="contracts-type-list/add-contracts" element={<CreateContracts/>}/>
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="auth-login" element={<Login />}></Route>
        </Route>
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </BrowserRouter>
  );
};
