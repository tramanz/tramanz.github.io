// src/App.jsx
import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Admin } from "./components/Admin";
import { Auth } from "./components/Auth";
import { Home } from "./components/Home";
import { useGetCurrentUser } from "./server/api/user";

export const App: FC = () => {
  const { user, loading, error } = useGetCurrentUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user && !error ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!user || error ? <Auth /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin"
          element={
            user?.is_admin && !error ? <Admin /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
