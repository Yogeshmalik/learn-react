import { Navigate } from "react-router";

const AuthLayout = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
export default AuthLayout;
