import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import SignUp from "../pages/SignUp";

export function AppProviderRoutes() {
  const { auth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
