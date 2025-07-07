import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicPanel from "./components/PUBLIC PANEL/PublicPanel";
import AdminLayout from "./components/ADMIN PANEL/AdminLayout";
import AdminPanel from "./components/ADMIN PANEL/AdminPanel";
import ProductUpload from "./components/ADMIN PANEL/pages/UploadPlant/UpLoadPlant";
import CategoryPage from "./components/ADMIN PANEL/pages/CategoryPage/CategoryPage";
import { useAuth, AuthProvider } from "./components/auth/AuthContext";
import PlantsList from "./components/ADMIN PANEL/pages/PlantsList/PlantsList";
import AnalyticsPage from "./components/ADMIN PANEL/pages/Analytics Page/AnalyticsPage";
import UsersPage from "./components/ADMIN PANEL/pages/UsersPage/UsersPage";
import EditPlant from "./components/ADMIN PANEL/pages/PlantsList/EditPlant";
import Orders from "./components/ADMIN PANEL/pages/Orders";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";

// Separate component for routes that need auth context
const AppRoutes = () => {
  const { currentUser, loading, isAuthenticated } = useAuth();

  // Show loading state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    // Call isAuthenticated as a function
    if (!isAuthenticated()) {
      return <Navigate to="/" />;
    }
    // Check if user is admin
    if (currentUser?.role !== 'admin') {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/*" element={<PublicPanel />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPanel />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/product/product-upload"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductUpload />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/category"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CategoryPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/product/product-list"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PlantsList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AnalyticsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Orders />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/product/plants-list"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PlantsList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/product/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <EditPlant />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
