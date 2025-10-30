import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import all your pages
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signuppage.jsx";
import TwoFactorPage from "./pages/twofa.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import InventoryPage from "./pages/inventorypage.jsx";
import OrdersPage from './pages/orderspage.jsx';
import CustomersPage from './pages/customerspage.jsx';
import AnalyticsPage from './pages/analyticspage.jsx';
import InvoicesPage from './pages/invoicespage.jsx';
import AlertsPage from './pages/alertspage.jsx';
import SettingsPage from './pages/settingspage.jsx';

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    
      <Routes>
        {/* Routes WITHOUT Sidebar/Navbar */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-2fa" element={<TwoFactorPage />} />

        {/* Routes WITH Sidebar/Navbar */}
        <Route 
          path="/*" 
          element={isLoggedIn ? <Layout /> : <Navigate to="/signup" />}
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Default route after login */}
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;