import { Navigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

//  Componente de orden superior (HOC) que protege las rutas según la autenticación y el rol del usuario.
export const ProtectorRutas = ({ allowedRoles, children }) => {
    // Extrae del contexto de autorización los datos del usuario y su estado de autenticación
    const { user, isAuthenticated } = useAutorizacion();

    //  Si el usuario no está autenticado, redirige automáticamente a la página de inicio ("/")
    // El atributo "replace" evita que la ruta anterior quede en el historial del navegador
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    //  Si la ruta tiene una restricción de roles y el rol del usuario NO está incluido en la lista permitida,
    // se redirige al usuario a una página de error ("/error").
    // Se asume que el rol del usuario se guarda como "user.rol" en el contexto.
    if (allowedRoles && !allowedRoles.includes(user?.rol)) {
        return <Navigate to="/error" replace />;
    }

    //  Si el usuario está autenticado y tiene un rol permitido, se muestra el contenido protegido.
    return children;
};
