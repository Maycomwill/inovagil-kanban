import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";

export function AppProviderRoutes() {
  const {auth} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
