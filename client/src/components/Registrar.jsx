import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

//  Componente de registro de usuario con validaciones de campos y contraseña
export function FormularioRegistro() {
  // Estado para validar el formulario visualmente (Bootstrap)
  const [validado, setValidado] = useState(false);
  // Estados para mostrar mensajes de éxito o error al registrar
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // Estado principal que almacena los datos del nuevo usuario
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    rol: "ALUMNO", // Valor por defecto: los nuevos registros serán alumnos
    state: true,
    lastname: "",
    name: "",
    score: 0,
    opcion1: "", // Motivación para aprender inglés
    opcion2: "", // Tiempo disponible
  });

  // Expresiones regulares para validar la contraseña (seguridad)
  const PASSWORD_REGEX = {
    minLength: /.{8,}/, // mínimo 8 caracteres
    uppercase: /[A-Z]/, // al menos una letra mayúscula
    lowercase: /[a-z]/, // al menos una letra minúscula
    number: /[0-9]/, // al menos un número
    specialChar: /[!@#$%^&*(),.?":{}|<>]/, // al menos un carácter especial
  };

  // Estado que guarda qué reglas de la contraseña fallan (true = falla)
  const [errorPassword, setErrorPassword] = useState({
    minLength: true,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true,
  });

  //  Función para manejar los cambios de los campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Si el campo modificado es "password", se validan las reglas
    if (name === "password") {
      setErrorPassword({
        minLength: !PASSWORD_REGEX.minLength.test(value),
        uppercase: !PASSWORD_REGEX.uppercase.test(value),
        lowercase: !PASSWORD_REGEX.lowercase.test(value),
        number: !PASSWORD_REGEX.number.test(value),
        specialChar: !PASSWORD_REGEX.specialChar.test(value),
      });
    }
  };

  //  Función para enviar los datos al servidor al hacer submit
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    const form = e.currentTarget;
    // Verifica que todas las reglas de contraseña se cumplan
    const passwordValido = Object.values(errorPassword).every((v) => v === false);

    // Si el formulario no es válido o la contraseña falla, muestra errores
    if (form.checkValidity() === false || !passwordValido) {
      e.stopPropagation();
      setValidado(true);
      return;
    }

    try {
      // Envío de los datos del usuario al backend
      const response = await axios.post("api/usuarios/registrarUsuarios", usuario);

      // Si el backend devuelve éxito, se muestra mensaje positivo
      if (response.data.success) {
        setRegSuccess("Registro exitoso");
      } else {
        setRegError("Error al registrar usuario");
      }
    } catch (error) {
      // Captura de errores de red o respuesta no esperada
      setRegError(error.message || "Error al registrar el usuario. Por favor, intente nuevamente.");
    }

    //  Reset completo del formulario después del envío
    setUsuario({
      username: "",
      password: "",
      rol: "ALUMNO",
      state: true,
      lastname: "",
      name: "",
      score: 0,
      opcion1: "",
      opcion2: "",
    });

    // Reset de las validaciones de contraseña
    setErrorPassword({
      minLength: true,
      uppercase: true,
      lowercase: true,
      number: true,
      specialChar: true,
    });

    // Reinicia el estado de validación visual
    setValidado(false);
  };

  // Determina si hay algún error en la contraseña
  const passwordInvalido = Object.values(errorPassword).some((v) => v);

  // Lista de reglas visibles para el usuario
  const passwordRules = [
    { key: "minLength", text: "Mínimo 8 caracteres" },
    { key: "uppercase", text: "Al menos una letra mayúscula" },
    { key: "lowercase", text: "Al menos una letra minúscula" },
    { key: "number", text: "Al menos un número" },
    { key: "specialChar", text: "Al menos un carácter especial (e.g., !@#$%^&*)" },
  ];

  //  Estructura visual del formulario
  return (
    <Container className="mt-5 p-4 border rounded-3 bg-light text-dark">
      <Form noValidate validated={validado} onSubmit={manejarEnvio}>
        {/* Alertas de error o éxito al registrar */}
        {regError && <Alert variant="danger">{regError}</Alert>}
        {regSuccess && <Alert variant="success">{regSuccess}</Alert>}

        {/*  Nombre y Apellido */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validacionNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Ingrese su nombre"
              value={usuario.name}
              onChange={manejarCambio}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validacionApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastname"
              placeholder="Ingrese su apellido"
              value={usuario.lastname}
              onChange={manejarCambio}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un apellido válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/*  Nombre de usuario */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validacionUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Ingrese su usuario"
              value={usuario.username}
              onChange={manejarCambio}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre de usuario.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/*  Contraseña con validación dinámica */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validacionPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Ingrese una contraseña"
              value={usuario.password}
              onChange={manejarCambio}
              isInvalid={passwordInvalido && (validado || usuario.password.length > 0)}
              required
            />
            <Form.Control.Feedback type="invalid">
              <ul className="list-unstyled mt-2 mb-0">
                {passwordRules.map((rule) => (
                  <li
                    key={rule.key}
                    className={errorPassword[rule.key] ? "text-danger" : "text-success"}
                  >
                    • {rule.text}
                  </li>
                ))}
              </ul>
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/*  Motivación para aprender inglés */}
        <Form.Group className="mb-3" controlId="opcion1">
          <Form.Label>¿Cuál es tu principal motivación para aprender inglés?</Form.Label>
          <Form.Select
            name="opcion1"
            value={usuario.opcion1}
            onChange={manejarCambio}
            required
          >
            <option value="">Elegí una opción</option>
            <option value="Trabajo">Trabajo / crecimiento profesional</option>
            <option value="Estudios">Estudios / exámenes</option>
            <option value="Viajes">Viajes y cultura</option>
            <option value="Comunicacion">Mejorar comunicación</option>
          </Form.Select>
        </Form.Group>

        {/* ⏱ Tiempo disponible */}
        <Form.Group className="mb-4" controlId="opcion2">
          <Form.Label>¿Cuánto tiempo disponible tenés semanalmente para clases?</Form.Label>
          <Form.Select
            name="opcion2"
            value={usuario.opcion2}
            onChange={manejarCambio}
            required
          >
            <option value="">Elegí una opción</option>
            <option value="2-4h">2–4 horas</option>
            <option value="5-7h">5–7 horas</option>
            <option value="8-10h">8–10 horas</option>
            <option value="11+h">11+ horas</option>
          </Form.Select>
        </Form.Group>

        {/*  Aceptar términos y condiciones */}
        <Form.Group className="mb-3" controlId="validacionTerminos">
          <Form.Check
            required
            label={
              <>
                Acepto los{" "}
                <a href="/pautas" target="_blank" rel="noopener noreferrer">
                  términos y condiciones
                </a>
              </>
            }
            feedback="Debe aceptar antes de enviar."
            feedbackType="invalid"
          />
        </Form.Group>

        {/* Botón final de envío */}
        <Button type="submit">Registrar</Button>
      </Form>
    </Container>
  );
}
