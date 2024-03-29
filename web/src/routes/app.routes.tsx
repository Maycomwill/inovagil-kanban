import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

export function AppProviderRoutes() {
  const auth = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
