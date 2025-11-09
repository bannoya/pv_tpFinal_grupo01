import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Encuesta() {
    const [motivacion, setMotivacion] = useState("");
    const [tiempo, setTiempo] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        if (!motivacion || !tiempo) return;
        window.location.href = "/games";
    };

    return (
        <Container className="mt-5 p-4 border rounded-3 bg-light text-dark" style={{ maxWidth: 640 }}>
            <h3 className="mb-4 text-center">Encuesta</h3>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>¿Cuál es tu principal motivación para aprender inglés?</Form.Label>
                    <Form.Select
                        value={motivacion}
                        onChange={(e) => setMotivacion(e.target.value)}
                        required
                    >
                        <option value="">Elegí una opción</option>
                        <option value="Trabajo">Trabajo / crecimiento profesional</option>
                        <option value="Estudios">Estudios / exámenes</option>
                        <option value="Viajes">Viajes y cultura</option>
                        <option value="Comunicacion">Mejorar comunicación</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>¿Cuánto tiempo disponible tenés semanalmente para clases?</Form.Label>
                    <Form.Select
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                        required
                    >
                        <option value="">Elegí una opción</option>
                        <option value="2-4h">2–4 horas</option>
                        <option value="5-7h">5–7 horas</option>
                        <option value="8-10h">8–10 horas</option>
                        <option value="11+h">11+ horas</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2 justify-content-center">
                    <Button type="submit">Enviar {console.log(tiempo, motivacion )}</Button>
                    <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => (window.location.href = "/games")}
                    >
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
