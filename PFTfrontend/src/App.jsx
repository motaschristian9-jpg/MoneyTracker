import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./components/routes/PublicRoutes.jsx";
import PrivateRoutes from "./components/routes/PrivateRoutes.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/authpages/LoginPage.jsx";
import SignupPage from "./pages/authpages/SignupPage.jsx";
import GoogleAuthCallback from "./pages/authpages/GoogleAuthCallback.jsx";
import ForgotPasswordPage from "./pages/authpages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/authpages/ResetPasswordPage.jsx";

import MainLayout from "./layout/MainLayout.jsx"; // your layout
import DashboardPage from "./pages/userpages/DashboardPage.jsx"; // your dashboard page
import TransactionPage from "./pages/userpages/TransactionPage.jsx";
import IncomePage from "./pages/userpages/IncomePage.jsx";
import ExpensePage from "./pages/userpages/ExpensePage.jsx";
import BudgetPage from "./pages/userpages/BudgetPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-auth-callback" element={<GoogleAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        {/* All private pages share MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          {/* Add more private pages here */}
        </Route>
      </Route>
    </Routes>
  );
}
