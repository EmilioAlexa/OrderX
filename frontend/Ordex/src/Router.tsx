import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/dashboard"; // Verifica que la mayúscula coincida con el nombre del archivo
import Login from "./components/Login"; 
import Staff from "./components/staff";
import Profile from "./components/profile/profile"; 
import ProfileAdd from "./components/profile/profile.add"; 

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileadd" element={<ProfileAdd />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
