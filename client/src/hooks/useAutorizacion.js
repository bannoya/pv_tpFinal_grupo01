import { useContext } from "react";

// Importamos el contexto de autorización que contiene la información del usuario,
// funciones de login/logout, y demás datos relacionados con la autenticación.
import { AutorizacionContext } from "../context/AutorizacionContext.jsx";

// Definimos un hook personalizado llamado useAutorizacion,
// que facilita el uso del contexto de autorización en cualquier componente.
export function useAutorizacion() {
    // Obtenemos el valor actual del contexto (user, login, logout, etc.)
    const context = useContext(AutorizacionContext);

    // Si el contexto no existe (es null), significa que este hook
    // se está usando fuera del <AutorizacionProvider>, lo cual no está permitido.
    // En ese caso lanzamos un error claro para ayudar al desarrollador.
    if (context === null) {
        throw new Error("useAutorizacion debe ser usado dentro de un AutorizacionProvider");
    }

    // Si todo está correcto, devolvemos el contexto con todos sus valores y funciones.
    return context;
}
