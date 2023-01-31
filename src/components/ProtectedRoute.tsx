import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element;
  allowed: boolean;
  redirectTo: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo,
  allowed,
}: ProtectedRouteProps) => {
  if (!allowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};
