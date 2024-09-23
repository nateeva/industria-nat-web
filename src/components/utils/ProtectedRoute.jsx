import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);  // Estado para verificar si se está chequeando

  useEffect(() => {
    const dtosLogin = JSON.parse(localStorage.getItem('login1'));
    
    if (dtosLogin?.login) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsChecking(false);  // Finaliza la verificación de autenticación
  }, []);

  // Mientras está verificando, no renderiza nada
  if (isChecking) {
    return null; // Puedes devolver un spinner o un indicador de carga si lo prefieres
  }

  // Si no está autenticado, redirige a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo
  return children;
};

export default ProtectedRoute;
