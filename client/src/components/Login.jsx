import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";

//  Componente de inicio de sesión (Login)
export const Login = () => {
  //  Estados locales para manejar los campos del formulario y errores
  const [username, setUsername] = useState(""); // Guarda el nombre de usuario ingresado
  const [password, setPassword] = useState(""); // Guarda la contraseña
  const [loginError, setLoginError] = useState(""); // Guarda un mensaje de error si el login falla

  const navigate = useNavigate(); // Hook de React Router para redirigir al usuario

  // Extrae funciones y datos del contexto de autenticación
  const { login, user, isAuthenticated } = useAutorizacion();

  //  useEffect: se ejecuta cuando cambia el estado de autenticación o el usuario
  useEffect(() => {
    if (!isAuthenticated) return; // Si aún no está autenticado, no hace nada

    //  Obtiene el rol del usuario desde la propiedad que esté disponible
    const role = user?.role ?? user?.rol;

    // Si el rol no es válido (ni ADMINISTRATIVO ni ALUMNO), redirige a una página de error
    if (!role === "ADMINISTRATIVO" && !role === "ALUMNO") {
      navigate("/error", { replace: true });
    } 
    // Si tiene un rol válido, redirige al home
    else if (role) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  //  Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página
    setLoginError(""); // Limpia errores anteriores

    //  Validación simple de campos vacíos
    if (!username || !password) {
      setLoginError("Por favor, complete todos los campos.");
      return;
    }

    // Llama a la función login del contexto de autenticación
    const result = await login({ username, password });

    // Si el login falla, muestra el mensaje de error correspondiente
    if (!result.success) {
      setLoginError(result.message || "Error desconocido durante el inicio de sesión.");
    }
  };

  //  Renderizado del formulario de inicio de sesión
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      {/* Tarjeta visual que contiene el formulario */}
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-sm">
        <Card.Body className="p-4">
          <Card.Title className="mb-4 text-center" as="h2">
            Iniciar Sesión
          </Card.Title>

          {/*  Formulario controlado */}
          <Form onSubmit={handleSubmit}>
            {/* Campo para el nombre de usuario */}
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
                required
                autoComplete="username"
              />
            </Form.Group>

            {/* Campo para la contraseña */}
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                required
                autoComplete="current-password"
              />
            </Form.Group>

            {/*  Muestra mensaje de error si algo salió mal al iniciar sesión */}
            {loginError && <Alert variant="danger" className="mt-3">{loginError}</Alert>}

            {/* Botón principal para enviar el formulario */}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
