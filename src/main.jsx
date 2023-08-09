import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Router } from "./router/router.jsx";

import "./styles/scss/dashlite.scss";
import "./styles/scss/style-email.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login.jsx";

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth-login" element={<Login />} />
          <Route path="/22" element={<>22</>} />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
