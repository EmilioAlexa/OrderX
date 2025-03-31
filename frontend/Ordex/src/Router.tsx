import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/dashboard"; // Verifica que la mayúscula coincida con el nombre del archivo
import Login from "./components/Login"; 
import Staff from "./components/staff"; 

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
