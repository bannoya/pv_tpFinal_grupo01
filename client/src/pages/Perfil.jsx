// src/pages/Perfil.jsx
import React from "react";
import { Container, Card, ListGroup, Spinner } from "react-bootstrap";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

export default function Perfil() {
  const { user, isAuthenticated } = useAutorizacion();

  if (!isAuthenticated) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 560 }}>
          <Card.Body className="text-center">
            <Spinner animation="border" className="mb-3" />
            <div>Iniciá sesión para ver tu perfil.</div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 560 }}>
          <Card.Body className="text-center">
            <Spinner animation="border" className="mb-3" />
            <div>Cargando perfil…</div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const username = user.username ?? "—";
  const name = user.name ?? "—";
  const lastname = user.lastname ?? "—";
  const rol = user.role ?? user.rol ?? "—";
  const state = typeof user.state === "boolean" ? (user.state ? "ACTIVO" : "INACTIVO") : "—";
  const encuesta = user.encuesta ?? "—";
  const score = typeof user.score === "number" ? user.score : 0;

  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card className="w-100" style={{ maxWidth: 560 }}>
        <Card.Header><strong>Perfil</strong></Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="text-muted small">Usuario</div>
            <div>{username}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Nombre</div>
            <div>{name}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Apellido</div>
            <div>{lastname}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Rol</div>
            <div>{rol}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Estado</div>
            <div>{state}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Encuesta</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{encuesta}</div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="text-muted small">Score</div>
            <div><strong>{score}</strong></div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
