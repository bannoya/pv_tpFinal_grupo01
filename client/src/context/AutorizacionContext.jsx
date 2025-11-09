// Importaciones necesarias desde React y axios
import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

// Se crea el contexto global de autorización, que permitirá compartir datos
// de autenticación en toda la aplicación.
export const AutorizacionContext = createContext(null);

// Constantes para clave de almacenamiento local y la URL base del backend
const LS_KEY = "auth:user";
const BASE_URL = "http://localhost:5000/api/usuarios";

// Componente proveedor del contexto de autorización
export function AutorizacionProvider({ children }) {
  // Estado para guardar todos los usuarios obtenidos de la base de datos
  const [usuarioDB, setUsuarioDB] = useState([]);
  // Estado para controlar si los usuarios están siendo cargados
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  // Estado del usuario actualmente autenticado
  // Se inicializa leyendo desde localStorage si ya hay una sesión guardada
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      // Si ocurre un error al parsear, se limpia el localStorage
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  // Endpoint de obtención de usuarios
  const API = `${BASE_URL}/obtenerUsuarios`;

  // Función asincrónica para traer los usuarios desde el backend
  const buscarUsuario = useCallback(async () => {
    try {
      setLoadingUsuarios(true);
      const res = await axios.get(API);
      // Guardamos los usuarios en el estado local
      setUsuarioDB(res.data || []);
      console.log(res.data);
    } catch (err) {
      console.error("Error al buscar usuario en la base de datos:", err);
      setUsuarioDB([]);
    } finally {
      // Desactivamos el indicador de carga
      setLoadingUsuarios(false);
    }
  }, []);

  // Efecto: se ejecuta al montar el componente para cargar los usuarios
  useEffect(() => {
    buscarUsuario();
  }, [buscarUsuario]);

  // --- LOGIN ---
  // Función para iniciar sesión verificando las credenciales con los usuarios obtenidos
  const login = useCallback(
    async (credenciales) => {
      // Si la lista aún no se cargó, se vuelve a buscar
      if (!usuarioDB.length) {
        await buscarUsuario();
      }
      const lista = usuarioDB;

      // Se busca el usuario por coincidencia de username y password
      const found = lista.find(
        (u) =>
          u.username === credenciales.username &&
          u.password === credenciales.password
      );

      if (found) {
        // Si se encuentra, se normalizan los datos (por ejemplo, 'rol' → 'role')
        const { password, ...rest } = found;
        const normalized = { ...rest, role: found.rol };

        // Se guarda el usuario autenticado en el estado
        setUser(normalized);

        // Se devuelve un resultado exitoso
        return { success: true };
      } else {
        // Si no se encuentra, limpiamos el estado del usuario
        setUser(null);
        return { success: false, message: "Credenciales inválidas" };
      }
    },
    [usuarioDB, buscarUsuario]
  );

  // --- LOGOUT ---
  // Función para cerrar sesión: limpia el usuario actual y borra localStorage
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  // --- GUARDAR SCORE ---
  // Función asincrónica para actualizar el puntaje (score) del usuario en la base de datos
  const saveScore = useCallback(
    async ({ username, score }) => {
      // Validamos que el score sea numérico
      if (typeof score !== "number") {
        return { success: false, message: "score debe ser numérico" };
      }

      try {
        // Endpoint de actualización del score por username
        const url = `${BASE_URL}/by-username/${encodeURIComponent(username)}/score`;
        const res = await axios.put(url, { score });
        const data = res?.data;

        // Validamos respuesta del backend
        if (!data?.success || !data?.data) {
          throw new Error(data?.message || "No se pudo actualizar el score");
        }

        // Si el usuario actual coincide con el actualizado, sincronizamos el contexto y localStorage
        if (user && user.username === username) {
          const updatedUser = { ...user, score: data.data.score };
          setUser(updatedUser);
          localStorage.setItem(LS_KEY, JSON.stringify(updatedUser));
        }

        // También actualizamos el caché local de usuarios
        setUsuarioDB((prev) =>
          Array.isArray(prev)
            ? prev.map((u) =>
                u.username === username
                  ? { ...u, score: data.data.score }
                  : u
              )
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

  // --- PERSISTENCIA DE SESIÓN ---
  // Cada vez que cambia el usuario, actualizamos el localStorage
  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  // --- MEMOIZACIÓN DEL CONTEXTO ---
  // Creamos un objeto memoizado con todas las funciones y datos que se compartirán
  const value = useMemo(
    () => ({
      user,                // Usuario autenticado
      isAuthenticated: !!user, // Booleano de autenticación
      login,               // Función para iniciar sesión
      logout,              // Función para cerrar sesión
      usuarioDB,           // Lista de usuarios obtenidos
      loadingUsuarios,     // Indicador de carga
      saveScore,           // Función para guardar el puntaje
    }),
    [user, login, logout, usuarioDB, loadingUsuarios, saveScore]
  );

  // Proveedor del contexto, que envuelve al resto de la aplicación
  return (
    <AutorizacionContext.Provider value={value}>
      {children}
    </AutorizacionContext.Provider>
  );
}
