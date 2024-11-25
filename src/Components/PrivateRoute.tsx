import { useContext, ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(SessionContext) || {
    isAuthenticated: false,
    isLoading: true,
  };

  if (isLoading) {
    return <Loader size={"xl"} type="dots" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;