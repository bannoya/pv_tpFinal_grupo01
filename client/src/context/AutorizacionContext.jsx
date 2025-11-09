import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

export const AutorizacionContext = createContext(null);

const LS_KEY = "auth:user";
const BASE_URL = "http://localhost:5000/api/usuarios";

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


  const API = `${BASE_URL}/obtenerUsuarios`;

  const buscarUsuario = useCallback(async () => {
    try {
      setLoadingUsuarios(true);
      const res = await axios.get(API);
    
      setUsuarioDB(res.data || []);
      console.log(res.data)
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
        // Normaliza: guardá _id y mapear rol -> role
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

  const saveScore = useCallback(
  async ({ username, score }) => {
    if (typeof score !== "number") {
      return { success: false, message: "score debe ser numérico" };
    }
    try {
      const url = `${BASE_URL}/by-username/${encodeURIComponent(username)}/score`;
      const res = await axios.put(url, { score });
      const data = res?.data;

      if (!data?.success || !data?.data) {
        throw new Error(data?.message || "No se pudo actualizar el score");
      }

      // Sincronizar user si coincide
      if (user && user.username === username) {
        const updatedUser = { ...user, score: data.data.score };
        setUser(updatedUser);
        localStorage.setItem(LS_KEY, JSON.stringify(updatedUser));
      }

      // Actualizar cache
      setUsuarioDB(prev =>
        Array.isArray(prev)
          ? prev.map(u => u.username === username ? { ...u, score: data.data.score } : u)
          : prev
      );

      return { success: true, data: data.data };
    } catch (err) {
      console.error("saveScore error:", err);
      return { success: false, message: String(err?.message || err) };
    }
  },
  [user]
);

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
      saveScore,
    }),

    [user, login, logout, usuarioDB, loadingUsuarios, saveScore]
  );

  return (
    <AutorizacionContext.Provider value={value}>
      {children}
    </AutorizacionContext.Provider>
  );
}
