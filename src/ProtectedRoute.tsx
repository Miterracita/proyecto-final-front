import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './utils/authUtils';

interface ProtectedRouteProps {
  isAdminRequired?: boolean;
}

const ProtectedRoute = ({ isAdminRequired = false }:ProtectedRouteProps ) => {

//verifica si el usuario está identificado y tiene un token válido
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />; // Redirige al login si no está autenticado
  }

  const userRole = getUserRole(); //obtiene el rol del token

  if (isAdminRequired && userRole !== "admin") {
    return <Navigate to="/home" replace />; // Redirige a /home si el usuario no es admin
  }

  if (!isAdminRequired && userRole === "admin") {
    return <Navigate to="/gestion-usuarios" replace />; // Redirige a /gestion-usuarios si es admin
  }

  return <Outlet />; // Si se cumple la condición, permite el acceso a la ruta

};

export default ProtectedRoute;