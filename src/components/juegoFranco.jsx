import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import cat from '../assets/sound/cat.mp3';
import dog from '../assets/sound/dog.mp3';
import cats from '../assets/sound/cats.mp3';
import dogs from '../assets/sound/dogs.mp3';

const audios = [cat, dog, cats, dogs];

export function JuegoFranco() {
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [audioSeleccionado, setAudioSeleccionado] = useState(null);
    const [resultado, setResultado] = useState(null); // true = correcto, false = incorrecto
    const [show, setShow] = useState(true);

    useEffect(() => {
        generarAudio();
    }, []);
    const generarAudio = () => {
        const randomIndex = Math.floor(Math.random() * audios.length);
        setAudioSeleccionado(new Audio(audios[randomIndex]));
        setRespuestaSeleccionada(null);
        setShow(false);
        setResultado(null);
    };

    const playAudio = () => {
        if (audioSeleccionado) audioSeleccionado.play();
    };

    const opciones = [
        { id: "1", texto: "Perro" },
        { id: "2", texto: "Gato" },
        { id: "3", texto: "Gatos" },
        { id: "4", texto: "Perros" },
    ];

    const seleccionarOpcion = (id) => {
        setRespuestaSeleccionada(id);
    };

    const comprobarRespuesta = () => {
        if (!respuestaSeleccionada) return; // no hacer nada si no hay selección
        setShow(true);
        let eleccion = false;

        if ((audioSeleccionado.src.includes('cat') && respuestaSeleccionada === "2") ||
            (audioSeleccionado.src.includes('dog') && respuestaSeleccionada === "1") ||
            (audioSeleccionado.src.includes('cats') && respuestaSeleccionada === "3") ||
            (audioSeleccionado.src.includes('dogs') && respuestaSeleccionada === "4")) {
            eleccion = true;
        }

        setResultado(eleccion);
    };

    return (

        <Container fluid className="p-5 bg-light text-center">
            <Row className="mb-4 flex-column gap-4">
                <h1>Elige la opción correcta que corresponde al audio</h1>

                <Col>
                    <button
                        className="btn btn-success btn-lg"
                        style={{ height: "100px", width: "200px" }}
                        onClick={playAudio}
                    >
                        <span role="img" aria-label="play" style={{ marginRight: "8px" }}>▶️</span>
                        Audio
                    </button>
                </Col>

                <Col className="d-flex justify-content-center gap-3">
                    {opciones.map((opcion) => (
                        <button
                            key={opcion.id}
                            id={`btn-opcion-${opcion.id}`}
                            className={`btn btn-outline-primary btn-lg ${respuestaSeleccionada === opcion.id ? "active" : ""}`}
                            style={{ height: "100px", width: "200px", marginTop: "100px" }}
                            onClick={() => seleccionarOpcion(opcion.id)}
                        >
                            {opcion.texto}
                        </button>
                    ))}
                </Col>

                <div>
                    {resultado !== null && show && (

                        <Alert show={show} variant={resultado ? "success" : "danger"} onClose={() => setShow(false)}
                            dismissible className="mt-3">{resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                        </Alert>
                    )}

                </div>
                <div>
                    {resultado ? <Button onClick={generarAudio} variant="success">
                        Reiniciar 
                    </Button> : null}

                </div>

                <Col>
                    <button
                        className="btn btn-success btn-lg"
                        style={{ height: "50px", width: "200px", marginTop: "10px" }}
                        onClick={comprobarRespuesta}
                    >
                        Comprobar
                    </button>
                </Col>
            </Row>
        </Container>
    );
}
