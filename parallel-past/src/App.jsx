import "./App.css";
import "./index.css";
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout is to  all nested routes */}
        <Route path="/" element={<MainLayout />}>
          
          {/* index means this is the default pageat that url" / "*/}
          <Route index element={<LandingPage />} />
          
          {/* This loads DashboardPage when url is "/dashboard" */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Catch-all for 404 Not Found */}
          <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
