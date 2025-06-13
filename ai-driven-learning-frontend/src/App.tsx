import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function DashboardWrapper() {
  const location = useLocation();
  const userId = location.state?.userId;
  if (!userId) return <Navigate to="/login" />;
  return <Dashboard userId={userId} onLogout={() => window.location.href = "/login"} />;
}

function AdminDashboardWrapper() {
  const location = useLocation();
  const userId = location.state?.userId;
  if (!userId) return <Navigate to="/login" />;
  return <AdminDashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<DashboardWrapper />} />
          <Route path='/admin' element={<AdminDashboardWrapper />} />
          <Route path='/' element={<div>HomePage</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
