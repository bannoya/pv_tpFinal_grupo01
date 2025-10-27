import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

export function FormularioRegistro() {
    const [validado, setValidado] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
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

    const manejarEnvio = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const passwordValido = Object.values(errorPassword).every((v) => v === false);

        if (form.checkValidity() === false || !passwordValido) {
            e.stopPropagation();
            setValidado(true);
        } else {
            const nuevoUsuario = { id: Date.now(), ...usuario };
            setUsuarios([...usuarios, nuevoUsuario]);
            setUsuario({
                nombre: "",
                apellido: "",
                email: "",
                username: "",
                password: "",
            });
            setValidado(false);
            alert("Registro exitoso");
            console.log(usuario);
        }
        
    };

    const passwordInvalido = Object.values(errorPassword).some((v) => v);

    return (
        <Container className="mt-5 p-4 border rounded-3 bg-light">
            <Form noValidate validated={validado} onSubmit={manejarEnvio}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validacionNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nombre"
                            placeholder="Ingrese su nombre"
                            value={usuario.nombre}
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
                            name="apellido"
                            value={usuario.apellido}
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

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validacionPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Ingrese una contraseña"
                            value={usuario.password}
                            onChange={manejarCambio}
                            isInvalid={passwordInvalido && validado}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            <div className="mt-2">
                                <ul className="list-unstyled mb-0">
                                    <li
                                        className={
                                            errorPassword.minLength ? "text-danger" : "text-success"
                                        }
                                    >
                                        • Mínimo 8 caracteres
                                    </li>
                                    <li
                                        className={
                                            errorPassword.uppercase ? "text-danger" : "text-success"
                                        }
                                    >
                                        • Al menos una letra mayúscula
                                    </li>
                                    <li
                                        className={
                                            errorPassword.lowercase ? "text-danger" : "text-success"
                                        }
                                    >
                                        • Al menos una letra minúscula
                                    </li>
                                    <li
                                        className={
                                            errorPassword.number ? "text-danger" : "text-success"
                                        }
                                    >
                                        • Al menos un número
                                    </li>
                                    <li
                                        className={
                                            errorPassword.specialChar ? "text-danger" : "text-success"
                                        }
                                    >
                                        • Al menos un caracterer especial (e.g., !@#$%^&*)
                                    </li>
                                </ul>
                            </div>
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="validacionTerminos">
                    <Form.Check
                        required
                        label={
                            <>
                                Acepto los{" "}
                                <a
                                    href="/pautas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    términos y condiciones
                                </a>
                            </>
                        }
                        feedback="Debe aceptar antes de enviar."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Registrar</Button>
            </Form>
        </Container>

    );

}
