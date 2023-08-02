import PropTypes from "prop-types";

export const ProtectedRoute = ({ hasAccessRoles, children }) => {
  const userRole = "BASIC";

  const userToken = localStorage.getItem("u_at");

  if (!userToken || userToken === "undefined") {
    return window.location.replace(
      `/auth-login?callbackUri=${window.location.href}`
    );
  }

  const hasAccess = hasAccessRoles.find((role) => role === userRole);

  if (!hasAccess) {
    return window.location.replace("/no-access");
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  hasAccessRoles: PropTypes.array,
};
