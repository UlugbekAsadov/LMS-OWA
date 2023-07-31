import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./protected-router";

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

        <Route path="/login" element={<>Login</>} />
        <Route path="/no-access" element={<>no access</>} />
      </Routes>
    </BrowserRouter>
  );
};
