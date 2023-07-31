import PropTypes from "prop-types";

export const ProtectedRoute = ({ hasAccessRoles, children }) => {
  const userRole = "BASIC";

  const userToken = localStorage.getItem("user-token");

  if (!userToken || userToken === "undefined") {
    return window.location.replace("/login");
  }

  const hasAccess = hasAccessRoles.find((role) => role === userRole);

  if (!hasAccess) {
    return window.location.replace("/no-access");
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  hasAccessRoles: PropTypes.arrayOf("string"),
};
