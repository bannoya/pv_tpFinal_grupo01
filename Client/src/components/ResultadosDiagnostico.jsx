import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";

export function ResultadosDiagnostico({ contador, totalJuegos = 5 }) {
  const { darkMode } = useTheme();

  const mensajeFinal =
    contador >= totalJuegos * 2
      ? "¡Excelente trabajo! 🌟"
      : contador >= totalJuegos
      ? "¡Buen desempeño! 💪"
      : "Seguí practicando, vas por buen camino 🔁";

  return (
    <Container
      fluid
      className={`p-5 d-flex flex-column align-items-center justify-content-center min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)"
          : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Row className="text-center mb-4">
        <h1 className="fw-bold">🏁 Resultados del Diagnóstico</h1>
        <p className="fs-4 mt-3">
          Completaste los <strong>{totalJuegos}</strong> niveles.
        </p>
      </Row>

      <Row className="text-center mb-4">
        <h2 className="display-5 mb-2">
          Tu puntaje total: <span className="text-success">{contador}</span>
        </h2>
        <p className="mt-2 fs-5">{mensajeFinal}</p>
      </Row>

      <Row className="text-center mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            style={{ width: "220px", height: "60px" }}
            onClick={() => window.location.href = "/"} 
          >
            Volver al inicio 🏠
          </Button>
        </Col>
      </Row>

      <p className="mt-4 text-muted">
        ⚠️ El diagnóstico solo puede realizarse una vez por usuario.
      </p>
    </Container>
  );
}
