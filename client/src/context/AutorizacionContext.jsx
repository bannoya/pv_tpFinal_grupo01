import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

export const AutorizacionContext = createContext(null);

const LS_KEY = "auth:user";

export function AutorizacionProvider({ children }) {
  const [usuarioDB, setUsuarioDB] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  
  const API = "http://localhost:5000/api/usuarios/obtenerUsuarios";

  const buscarUsuario = useCallback(async () => {
    try {
      setLoadingUsuarios(true);
      const res = await axios.get(API);
      setUsuarioDB(res.data || []);
    } catch (err) {
      console.error("Error al buscar usuario en la base de datos:", err);
      setUsuarioDB([]);
    } finally {
      setLoadingUsuarios(false);
    }
  }, []);

  useEffect(() => {
    buscarUsuario();
  }, [buscarUsuario]);

  const login = useCallback(
    async (credenciales) => {
      // Si la lista aún no está cargada, intentamos cargarla
      if (!usuarioDB.length) {
        await buscarUsuario();
      }
      const lista = usuarioDB;

      const found = lista.find(
        (u) =>
          u.username === credenciales.username &&
          u.password === credenciales.password
      );

      if (found) {
        // Normalizamos el nombre del campo: rol -> role
        const { password, ...rest } = found;
        const normalized = { ...rest, role: found.rol };
        setUser(normalized);
        return { success: true };
      } else {
        setUser(null);
        return { success: false, message: "Credenciales inválidas" };
      }
    },
    [usuarioDB, buscarUsuario]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  // Persistencia
  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      usuarioDB,
      loadingUsuarios,
    }),
    [user, login, logout, usuarioDB, loadingUsuarios]
  );

  return (
    <AutorizacionContext.Provider value={value}>
      {children}
    </AutorizacionContext.Provider>
  );
}
