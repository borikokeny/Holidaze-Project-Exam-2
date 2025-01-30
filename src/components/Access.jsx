import React from "react";
import { useAuth } from "../context/AuthContext";

const SomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
};

export default SomePage;