import { Navigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion.js";



export const ProtectorRutas = ({ allowedRoles, children }) => {
    const { user, isAuthenticated } = useAutorizacion();


    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.rol)) {
        return <Navigate to="/error" replace />;
    }

    return children;

}
