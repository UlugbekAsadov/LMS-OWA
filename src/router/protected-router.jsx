import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { getUserQueryFn } from "../react-query/queries";
import { GlobalLoader } from "../pages/global-loader/global-loader.jsx";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ hasAccessRoles, children }) => {
  const userToken = localStorage.getItem("u_at");
  const { data, isLoading } = useQuery({
    queryFn: () => getUserQueryFn(),
    queryKey: "user",
    enabled: Boolean(userToken),
  });

  if (!userToken) {
    return <Navigate to={`/auth-login?callbackUri=${window.location.href}`} />;
  }

  if (isLoading) {
    return <GlobalLoader />;
  }

  const userRole = data.role;

  const hasAccess = hasAccessRoles.find((role) => role === userRole);

  if (!hasAccess) {
    return <Navigate to={`/no-access`} />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  hasAccessRoles: PropTypes.array,
};
