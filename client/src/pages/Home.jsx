// Importamos useState de React (aunque en este caso no se utiliza, se deja por si luego se amplía)
import { useState } from "react";
// Importamos estilos globales de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Importamos el hook personalizado que controla el modo oscuro/claro
import { useTheme } from "../context/ThemeContext.jsx";
// Importamos componentes de diseño de React-Bootstrap
import { Container, Row, Col } from "react-bootstrap";
// Importamos el componente Login
import { Login } from "../components/Login.jsx";
// Importamos el logo del proyecto
import logoPX from "../assets/img/icon_PX.png";
// Importamos el hook personalizado de autorización (manejo de usuario y sesión)
import { useAutorizacion } from "../hooks/useAutorizacion.js";
// Importamos un GIF usado como meme o imagen decorativa
import Meme from "../assets/img/meme.gif";

// Componente principal de la página de inicio
function Home() {
  // Obtenemos si el modo oscuro está activo
  const { darkMode } = useTheme();
  // Obtenemos si el usuario está autenticado
  const { isAuthenticated } = useAutorizacion();

  return (
    <>
      {/* Contenedor principal que ocupa toda la pantalla (100vh) */}
      <Container
        fluid
        className={`d-flex flex-column justify-content-center align-items-center ${
          darkMode ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        style={{ height: "100vh" }}
      >
        <Row className="justify-content-center align-items-center">
          {/* Si el usuario NO está autenticado, mostramos el formulario de login y el botón de registro */}
          {!isAuthenticated ? (
            <>
              {/* Botón para ir a la página de registro */}
              <Col xs="auto">
                <button
                  className="btn btn-success btn-lg"
                  style={{ height: "50px", width: "200px", marginTop: "10px" }}
                  onClick={() => (window.location.href = "/registrar")}
                >
                  Registrarse
                </button>
              </Col>

              {/* Formulario de inicio de sesión */}
              <Col sm="auto" style={{ minWidth: "400px" }}>
                <Login />
              </Col>
            </>
          ) : (
            // Si el usuario está autenticado, mostramos la vista con el logo y la animación (meme)
            <>
              {/* --- Encabezado con logo y nombre del proyecto --- */}
              <Row style={{ marginBottom: "-30px" }}>
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  {/* Logo del proyecto */}
                  <img
                    src={logoPX}
                    alt="Proyecto X Logo"
                    style={{
                      height: "100px",
                      width: "auto",
                      // Si el modo oscuro está activo, se invierte el color del logo
                      filter: darkMode ? "invert(1)" : "none",
                    }}
                  />
                  {/* Nombre del proyecto */}
                  <span style={{ fontSize: "50px" }}>Proyecto X</span>
                </Col>
              </Row>

              {/* --- Imagen inferior (GIF o meme divertido) --- */}
              <Row className="mt-5 text-center justify-content-center align-items-center ">
                <img
                  src={Meme}
                  alt="Meme"
                  style={{
                    height: "auto",
                    width: "auto",
                    // Invertir los colores del GIF si está en modo oscuro
                    filter: darkMode ? "invert(1)" : "none",
                  }}
                />
              </Row>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}

// Exportamos el componente para usarlo en las rutas principales
export default Home;
