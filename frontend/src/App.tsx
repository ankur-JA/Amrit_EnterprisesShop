import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import BillingPage from './pages/BillingPage';
import ReportsPage from './pages/ReportsPage';
import { AuthProvider, useAuth } from './auth';
import './App.css';

function Nav() {
  const { auth } = useAuth();
  if (!auth.token) return null;
  return (
    <nav>
      <Link to="/inventory">Inventory</Link> |{' '}
      <Link to="/billing">Billing</Link> |{' '}
      {auth.role === 'ADMIN' && <Link to="/reports">Reports</Link>}
    </nav>
  );
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {!auth.token && <Route path="*" element={<LoginPage />} />}
      {auth.token && (
        <>
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<InventoryPage />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
