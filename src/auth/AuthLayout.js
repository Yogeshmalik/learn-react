import { Navigate, useLocation } from "react-router";

const AuthLayout = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");
  const location = useLocation();

  if (!isAuth && location.pathname !== "/auth/login") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AuthLayout;
