import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const isExist = localStorage.getItem("users");
  const { pathname } = useLocation();

  if (!isExist) {
    return <Navigate to='/signin' state={{ path: pathname }} replace></Navigate>
  }
  return children;
};

export default ProtectRoute;
