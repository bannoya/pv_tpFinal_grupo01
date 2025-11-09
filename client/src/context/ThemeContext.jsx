// Importamos las funciones necesarias desde React
import { createContext, useContext, useState } from "react";

// Creamos un contexto llamado ThemeContext.
// Este contexto servirá para compartir el estado del tema (oscuro o claro)
// entre todos los componentes de la aplicación.
const ThemeContext = createContext();

// Hook personalizado para acceder fácilmente al contexto de tema.
// Permite usar: const { darkMode, toggleTheme } = useTheme();
export const useTheme = () => useContext(ThemeContext);

// Componente proveedor del tema que envolverá a toda la aplicación.
// Aquí se define el estado del modo oscuro y la función para alternarlo.
export const ThemeProvider = ({ children }) => {
  // Estado que controla si el tema actual es oscuro (true) o claro (false)
  const [darkMode, setDarkMode] = useState(false);

  // Función que invierte el valor actual de darkMode
  // Es decir, cambia entre modo oscuro y modo claro.
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Retornamos el proveedor del contexto
  return (
    // Enviamos como valor el estado actual y la función para cambiarlo.
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {/* 
        Este div actúa como contenedor global y aplica las clases de Bootstrap
        dependiendo del modo actual:
          - bg-dark text-light → modo oscuro
          - bg-light text-dark → modo claro
        Así, toda la interfaz cambia automáticamente de colores.
      */}
      <div
        className={`min-vh-100 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        {/* Los componentes hijos que estén dentro del ThemeProvider */}
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
