import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { getUserQuery } from "../react-query/queries";
import {GlobalLoader} from "../pages/global-loader/global-loader.jsx";

export const ProtectedRoute = ({ hasAccessRoles, children }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserQuery(),
    queryKey: "user",
  });

  if (isLoading) {
    return <GlobalLoader /> ;
  }

  const userRole = data.role;

  const userToken = localStorage.getItem("u_at");

  if (!userToken || userToken === "undefined") {
    // return window.location.replace(
    //   `/auth-login?callbackUri=${window.location.href}`
    // );
  }

  const hasAccess = hasAccessRoles.find((role) => role === userRole);

  if (!hasAccess) {
    // return window.location.replace("/no-access");
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  hasAccessRoles: PropTypes.array,
};
