import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

export function FormularioRegistro() {
  const [validado, setValidado] = useState(false);
  const [regError, setRegError] = useState("");

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    rol: "ALUMNO",
    state: true,
    lastname: "",
    name: "",
    score: 0,
  });

  const PASSWORD_REGEX = {
    minLength: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const [errorPassword, setErrorPassword] = useState({
    minLength: true,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true,
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setRegError("");

    const form = e.currentTarget;

    const passwordValido = Object.values(errorPassword).every((v) => v === false);

    if (form.checkValidity() === false || !passwordValido) {
      e.stopPropagation();
      setValidado(true);
      alert("Por favor, corrija los errores en el formulario.");
      return;
    }

    try {
      const response = await axios.post("api/usuarios/registrarUsuarios",usuario);
      if (response.data.success) {
        alert("Registro exitoso");
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      setRegError(
        error.message ||
          "Error al registrar el usuario. Por favor, intente nuevamente."
      );
    }

    setUsuario({
      username: "",
      password: "",
      rol: "ALUMNO",
      state: true,
      lastname: "",
      name: "",
      score: 0,
    });

    setErrorPassword({
      minLength: true,
      uppercase: true,
      lowercase: true,
      number: true,
      specialChar: true,
    });

    setValidado(false);
  };

  const passwordInvalido = Object.values(errorPassword).some((v) => v);

  return (
    <Container className="mt-5 p-4 border rounded-3 bg-light text-dark">
      <Form noValidate validated={validado} onSubmit={manejarEnvio}>
        {/* Campos de nombre y apellido */}
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
              value={usuario.lastname}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              onChange={manejarCambio}
              minLength={3}
              placeholder="Ingrese su apellido"
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un apellido válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Usuario */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validacionUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={usuario.username}
              onChange={manejarCambio}
              placeholder="Ingrese su usuario"
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre de usuario.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Contraseña */}
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
              <div className="mt-2">
                <ul className="list-unstyled mb-0">
                  <li className={errorPassword.minLength ? "text-danger" : "text-success"}>
                    • Mínimo 8 caracteres
                  </li>
                  <li className={errorPassword.uppercase ? "text-danger" : "text-success"}>
                    • Al menos una letra mayúscula
                  </li>
                  <li className={errorPassword.lowercase ? "text-danger" : "text-success"}>
                    • Al menos una letra minúscula
                  </li>
                  <li className={errorPassword.number ? "text-danger" : "text-success"}>
                    • Al menos un número
                  </li>
                  <li className={errorPassword.specialChar ? "text-danger" : "text-success"}>
                    • Al menos un carácter especial (e.g., !@#$%^&*)
                  </li>
                </ul>
              </div>
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Términos */}
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

        <Button type="submit">Registrar</Button>

        {regError && <p className="text-danger mt-3">{regError}</p>}
      </Form>
    </Container>
  );
}
