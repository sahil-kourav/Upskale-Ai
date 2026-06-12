import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";
import Loading from "./Loading";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={"/login"} />
  }

  return children;
};

export default Protected;
