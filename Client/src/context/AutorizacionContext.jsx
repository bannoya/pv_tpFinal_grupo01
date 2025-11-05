import { useState, useCallback, useEffect, createContext, useMemo } from "react";
import axios from "axios";

export const AutorizacionContext = createContext(null);

export function AutorizacionProvider({ children }) {
  const [usuarioDB, setUsuarioDB] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      const usuarioAlmacenado = localStorage.getItem("LOCAL_STORAGE_KEY");
      return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
    } catch (error) {
      localStorage.removeItem("LOCAL_STORAGE_KEY");
      return null;
    }
  });

  // 🔹 Obtener todos los usuarios desde el backend
  const buscarUsuario = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/obtenerUsuarios");
      setUsuarioDB(res.data);
      console.log("Usuarios cargados desde la BD:", res.data);
    } catch (error) {
      console.error("Error al buscar usuario en la base de datos:", error);
    }
  }, []);

  // 🔹 Función de login
  const login = useCallback(
    (credenciales) => {
      if (!usuarioDB || usuarioDB.length === 0) {
        return { success: false, message: "No hay usuarios cargados aún." };
      }

      const usuarioEncontrado = usuarioDB.find(
        (u) => u.username === credenciales.username && u.password === credenciales.password
      );

      if (usuarioEncontrado) {
        const { password, ...userWithoutPassword } = usuarioEncontrado;
        setUser(userWithoutPassword);
        return { success: true };
      } else {
        setUser(null);
        return { success: false, message: "Credenciales inválidas" };
      }
    },
    [usuarioDB]
  );

  // 🔹 Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("LOCAL_STORAGE_KEY");
  }, []);

  // 🔹 Persistencia en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("LOCAL_STORAGE_KEY", JSON.stringify(user));
    } else {
      localStorage.removeItem("LOCAL_STORAGE_KEY");
    }
  }, [user]);

  // 🔹 Cargar los usuarios al iniciar la app
  useEffect(() => {
    buscarUsuario();
  }, [buscarUsuario]);

  // 🔹 Valor del contexto (lo que los componentes hijos podrán usar)
  const valorContexto = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      usuarioDB,
    }),
    [user, login, logout, usuarioDB]
  );

  // ✅ CORRECCIÓN AQUÍ: ahora el provider expone TODAS las funciones y estados
  return (
    <AutorizacionContext.Provider value={valorContexto}>
      {children}
    </AutorizacionContext.Provider>
  );
}
