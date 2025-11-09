// Importamos componentes de React Router para la navegación entre rutas
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
// Importamos componentes de Bootstrap para diseño visual
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// Importamos el hook personalizado para el manejo del modo oscuro/claro
import { useTheme } from "../context/ThemeContext.jsx";

// Componente principal "Games", encargado de mostrar los juegos disponibles
export default function Games() {
  // Obtenemos el estado de tema actual (darkMode: true/false)
  const { darkMode } = useTheme();

  return (
    // Contenedor principal con clases de Bootstrap y estilos dinámicos
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 p-5
      ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        // Fondo con gradiente dinámico según el modo
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)"
          : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        transition: "all 0.4s ease-in-out", // animación suave al cambiar de modo
      }}
    >
      {/* --- Título principal --- */}
      <h1 className="fw-bold mb-5 display-5 text-center">
        🎮 Juegos Educativos
      </h1>

      {/* --- Tarjeta del juego --- */}
      <Card
        className={`shadow-lg border-0 text-center p-4 ${
          darkMode ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
        style={{
          width: "100%",
          maxWidth: "900px", // tamaño máximo de la tarjeta
          borderRadius: "1.5rem", // esquinas redondeadas
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // animación al hacer hover
        }}
      >
        {/* --- Encabezado de la tarjeta --- */}
        <Card.Header
          className={`fs-5 fw-semibold ${
            darkMode ? "bg-dark text-light" : "bg-primary text-white"
          }`}
          style={{
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
          }}
        >
          Juego #1
        </Card.Header>

        {/* --- Cuerpo del contenido --- */}
        <Card.Body className="px-4 py-5">
          {/* Título del juego */}
          <Card.Title className="fs-2 fw-bold mb-3">
            ⭐ Atrapa las Estrellas
          </Card.Title>

          {/* Descripción breve del juego */}
          <Card.Text className="fs-5 mb-4">
            Ayuda a un pequeño personaje a atrapar las estrellas antes de que
            desaparezcan del cielo. ¡Rápido, divertido y educativo!
          </Card.Text>

          {/* --- Botón para ingresar al juego --- */}
          <Link to="estrella">
            <Button
              variant={darkMode ? "light" : "primary"}
              size="lg"
              className="px-5 py-2 fw-semibold"
              style={{
                borderRadius: "1rem",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              // Efecto visual al pasar el mouse
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
              }}
              // Vuelve al estado normal al quitar el mouse
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Ir al juego 🚀
            </Button>
          </Link>

          {/* Outlet permite renderizar componentes hijos según la ruta */}
          <Outlet />
        </Card.Body>  
      </Card>
    </div>
  );
}
