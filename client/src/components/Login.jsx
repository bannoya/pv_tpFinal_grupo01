import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const { login, user, isAuthenticated } = useAutorizacion();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Si tu Provider normalizó a "role", usá user.role. Si no, tomá rol.
    const role = user?.role ?? user?.rol;

    if (!role === "ADMINISTRATIVO" && !role === "ALUMNO") {
      // Si no hay rol válido, no fuerces /error; dejá al usuario en donde está
      // o mostrá un mensaje. Si igual querés redirigir:
      navigate("/error", { replace: true });
    }else if(role) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!username || !password) {
      setLoginError("Por favor, complete todos los campos.");
      return;
    }

    const result = await login({ username, password });
    if (!result.success) {
      setLoginError(result.message || "Error desconocido durante el inicio de sesión.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-sm">
        <Card.Body className="p-4">
          <Card.Title className="mb-4 text-center" as="h2">
            Iniciar Sesión
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Form.Group>

            {loginError && <Alert variant="danger" className="mt-3">{loginError}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
