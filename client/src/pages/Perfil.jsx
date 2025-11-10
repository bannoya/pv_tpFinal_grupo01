// src/pages/Perfil.jsx

// Importamos React y los componentes necesarios desde react-bootstrap
import React from "react";
import { Container, Card, ListGroup, Spinner } from "react-bootstrap";
// Importamos nuestro hook personalizado de autenticación
import { useAutorizacion } from "../hooks/useAutorizacion.js";

// Componente principal Perfil
export default function Perfil() {
  // Obtenemos los datos del usuario y el estado de autenticación
  const { user} = useAutorizacion();

  // Si todavía no hay datos del usuario (por ejemplo, mientras se cargan desde el servidor)
  if (!user) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 560 }}>
          <Card.Body className="text-center">
            {/* Spinner de carga mientras se obtiene el perfil */}
            <Spinner animation="border" className="mb-3" />
            <div>Cargando perfil…</div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Variables que muestran los campos del perfil con valores por defecto en caso de ausencia
  const username = user.username ?? "—";
  const name = user.name ?? "—";
  const lastname = user.lastname ?? "—";
  // Algunos usuarios pueden tener la propiedad 'role' o 'rol', se cubren ambas posibilidades
  const rol = user.role ?? user.rol ?? "—";
  // Se muestra el estado del usuario en texto legible (ACTIVO / INACTIVO)
  const state =
    typeof user.state === "boolean" ? (user.state ? "ACTIVO" : "INACTIVO") : "—";
  // Resumen de las respuestas de la encuesta del registro
  const encuesta = [
    "Objetivo: " + (user.opcion1 ?? "—"),
    "\nTiempo: " + (user.opcion2 ?? "—"),
  ];
  // Puntaje del usuario (score), con valor 0 por defecto
  const score = typeof user.score === "number" ? user.score : 0;

  // Renderizado principal del perfil del usuario
  return (
    <Container className="py-4 d-flex justify-content-center">
      {/* Card principal con el contenido del perfil */}
      <Card className="w-100" style={{ maxWidth: 560 }}>
        <Card.Header>
          <strong>Perfil</strong>
        </Card.Header>

        {/* Lista con los diferentes campos del perfil */}
        <ListGroup variant="flush">
          {/* Nombre de usuario */}
          <ListGroup.Item>
            <div className="text-muted small">Usuario</div>
            <div>{username}</div>
          </ListGroup.Item>

          {/* Nombre */}
          <ListGroup.Item>
            <div className="text-muted small">Nombre</div>
            <div>{name}</div>
          </ListGroup.Item>

          {/* Apellido */}
          <ListGroup.Item>
            <div className="text-muted small">Apellido</div>
            <div>{lastname}</div>
          </ListGroup.Item>

          {/* Rol del usuario */}
          <ListGroup.Item>
            <div className="text-muted small">Rol</div>
            <div>{rol}</div>
          </ListGroup.Item>

          {/* Estado de la cuenta */}
          <ListGroup.Item>
            <div className="text-muted small">Estado</div>
            <div>{state}</div>
          </ListGroup.Item>

          {/* Respuestas de la encuesta guardadas al registrarse */}
          <ListGroup.Item>
            <div className="text-muted small">Encuesta</div>
            {/* Se usa whiteSpace: pre-wrap para mantener los saltos de línea del texto */}
            <div style={{ whiteSpace: "pre-wrap" }}>{encuesta}</div>
          </ListGroup.Item>

          {/* Puntaje obtenido en los juegos diagnósticos */}
          <ListGroup.Item>
            <div className="text-muted small">Puntaje</div>
            <div>
              <strong>{score}</strong>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
