import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/Register';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useUserContext } from "./context/UserContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUserContext();
  return !isAuthenticated ? <Navigate to="/login" replace /> : children;
}

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          } />
          <Route path="login" element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
