import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const RutaProtegida = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Pequeño delay para simular carga inicial del user
    const timer = setTimeout(() => setCargando(false), 50);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutaProtegida;
