// Importamos React y los componentes necesarios de React Bootstrap
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// Importamos el hook personalizado del contexto de tema (modo oscuro o claro)
import { useTheme } from "../context/ThemeContext.jsx";

// Componente que muestra los resultados finales del diagnóstico o test
export function ResultadosDiagnostico({ contador, totalJuegos = 5 }) {
  // Extraemos del contexto si el tema actual es modo oscuro o no
  const { darkMode } = useTheme();

  // Determinamos el valor del puntaje. 
  // Si contador es un número lo usamos directamente, si no, intentamos obtener el puntaje del usuario.
  const valor = typeof contador === "number" ? contador : (user?.score ?? 0);

  // Determinamos el mensaje final según el rendimiento del usuario
  const mensajeFinal =
    valor >= totalJuegos * 2
      ? "¡Excelente trabajo! 🌟" // Si duplicó el mínimo esperado
      : valor >= totalJuegos
        ? "¡Buen desempeño! 💪" // Si llegó al promedio esperado
        : "Seguí practicando, vas por buen camino 🔁"; // Si no alcanzó el promedio

  return (
    // Contenedor principal con estilos adaptados al modo oscuro o claro
    <Container
      fluid
      className={`p-5 d-flex flex-column align-items-center justify-content-center min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)" // Fondo oscuro degradado
          : "linear-gradient(135deg, #f8f9fa, #e9ecef)", // Fondo claro degradado
        transition: "all 0.3s ease-in-out", // Transición suave entre temas
      }}
    >
      {/* Título principal del diagnóstico */}
      <Row className="text-center mb-4">
        <h1 className="fw-bold">🏁 Resultados del Diagnóstico</h1>
        <p className="fs-4 mt-3">
          Completaste los <strong>{totalJuegos}</strong> niveles.
        </p>
      </Row>

      {/* Sección del puntaje obtenido */}
      <Row className="text-center mb-4">
        <h2 className="display-5 mb-2">
          Tu puntaje total: <span className="text-success">{contador}</span>
        </h2>
        {/* Mensaje motivacional según el desempeño */}
        <p className="mt-2 fs-5">{mensajeFinal}</p>
      </Row>

      {/* Botón para redirigir al perfil del usuario */}
      <Row className="text-center mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            style={{ width: "220px", height: "60px" }}
            onClick={() => window.location.href = `/perfil`} // Redirige al perfil
          >
            Ir Al Perfil
          </Button>
        </Col>
      </Row>

      {/* Mensaje informativo adicional */}
      <p className="mt-4 text-muted">
        ⚠️ El diagnóstico solo puede realizarse una vez por usuario.
      </p>
    </Container>
  );
}
