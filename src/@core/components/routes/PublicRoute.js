//  React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-Decode";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";

const PublicRoute = ({ children, route }) => {
  let flag = false;
  const userToken = useGetItem("token");

  if (route) {
    if (!route.access) {
      return <Suspense fallback={null}>{children}</Suspense>;
    } else {
      const userData = userToken && jwtDecode(userToken);
      const userRoles =
        userData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const accessRoles = route.access;

      accessRoles.map((role) => {
        if (userRoles.includes(role)) {
          flag = true;
        }
      });
      if (!flag) {
        // alert
      }
    }
  }

  return (
    <>
      {flag ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : (
        <Navigate to={"/home"} />
      )}
    </>
  );
};

export default PublicRoute;
