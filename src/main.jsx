import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BasicContractsProvider } from './context/basic-contract.context.jsx';

import './styles/scss/dashlite.scss';
import './styles/scss/style-email.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BasicContracts from './pages/basic-contract/basic-contract.jsx';
import EducationalCentersPage from './pages/educational-centers/educational-centers-page.jsx';
import StaffsPage from './pages/educational-centers/staffs/staffs-page.jsx';
import FutureProfessionsContract from './pages/future-professions-contract/future-professions-contract.jsx';
import CoursesList from './pages/courses/courses-list.jsx';
import ContractsTypeList from './pages/contracts/contracts-type-list.jsx';
import CreateContract from './pages/contracts/add-contracts/create-contract.jsx';
import Login from './pages/auth/login.jsx';
import Error403Classic from './pages/error/403-classic.jsx';
import Error500Classic from './pages/error/500-classic.jsx';
import Error404Classic from './pages/error/404-classic.jsx';
import ThemeProvider from './context/theme.context.jsx';
import { HomepageLayout } from './layout/homepage-layout/homepage-layout';
const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BasicContractsProvider>
        <ThemeProvider>
          <HomepageLayout>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/auth-login" />} />

                <Route path="/basic-contracts" element={<BasicContracts />} />
                <Route
                  path="/educational-center"
                  element={<EducationalCentersPage />}
                />
                <Route path="/staffs-list" element={<StaffsPage />} />
                <Route
                  path="/grand-contract"
                  element={<FutureProfessionsContract />}
                />
                <Route path="/courses-list" element={<CoursesList />} />
                <Route
                  path="/contracts-type-list"
                  element={<ContractsTypeList />}
                />
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
          </HomepageLayout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BasicContractsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
