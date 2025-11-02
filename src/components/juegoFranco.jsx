import React, { useState, useEffect } from "react";
import { Container, Row, Alert, Button } from "react-bootstrap";
import cat from "../assets/sound/cat.mp3";
import dog from "../assets/sound/dog.mp3";
import cats from "../assets/sound/cats.mp3";
import dogs from "../assets/sound/dogs.mp3";
import cow from "../assets/sound/cow.mp3";
import horse from "../assets/sound/horse.mp3";
import rooster from "../assets/sound/rooster.mp3";
import { useTheme } from "../context/ThemeContext.jsx";


const sonidos = [
    { id: 1, nombre: "Perro", audio: dog },
    { id: 2, nombre: "Gato", audio: cat },
    { id: 3, nombre: "Gatos", audio: cats },
    { id: 4, nombre: "Perros", audio: dogs },
    { id: 5, nombre: "Vaca", audio: cow },
    { id: 6, nombre: "Caballo", audio: horse },
    { id: 7, nombre: "Gallo", audio: rooster },
];

export function JuegoFranco() {
    const { darkMode } = useTheme();

    const [audioSeleccionado, setAudioSeleccionado] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);



    useEffect(() => {
        generarAudio();
    }, []);

    const mezclarArray = (array) => array.sort(() => Math.random() - 0.5);

    const generarAudio = () => {
        const randomIndex = Math.floor(Math.random() * sonidos.length);
        const seleccionado = sonidos[randomIndex];
        const incorrectas = sonidos
            .filter((s) => s.id !== seleccionado.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        const opcionesFinales = mezclarArray([...incorrectas, seleccionado]);
        setAudioSeleccionado(seleccionado);
        setOpciones(opcionesFinales);
        setRespuestaSeleccionada(null);
        setResultado(null);
        setShow(false);
    };

    const playAudio = () => {
        if (audioSeleccionado) {
            const audio = new Audio(audioSeleccionado.audio);
            audio.play();
        }
    };

    const comprobarRespuesta = () => {
        if (!respuestaSeleccionada) return;
        const esCorrecto = respuestaSeleccionada === audioSeleccionado.nombre;
        setResultado(esCorrecto);
        setShow(true);
    };

    return (
        <Container
            fluid
            className={`p-5 d-flex flex-column align-items-center justify-content-center min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"
                }`}
            style={{
                background: darkMode
                    ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)"
                    : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                transition: "all 0.4s ease-in-out",
            }}
        >


            <>
                <Row className="w-100 text-center mb-4">
                    <h1 className="fw-bold">
                        Elige la opción correcta que corresponde al audio
                    </h1>
                </Row>


                <Row className="w-100 d-flex justify-content-center mb-4">
                    <Button
                        variant="success"
                        size="lg"
                        style={{ height: "80px", width: "200px" }}
                        onClick={playAudio}
                    >
                        ▶️ Escuchar Audio
                    </Button>
                </Row>


                <Row className="d-flex flex-wrap justify-content-center gap-3 border p-4 rounded bg-white shadow-sm"
                    style={{
                        minHeight: "120px",
                        width: "80%",
                    }}>
                    {opciones.map((opcion) => (
                        <Button
                            key={opcion.id}
                            variant={
                                respuestaSeleccionada === opcion.nombre
                                    ? "primary"
                                    : "outline-primary"
                            }
                            className="btn-lg"
                            style={{ height: "80px", width: "200px" }}
                            onClick={() => setRespuestaSeleccionada(opcion.nombre)}
                        >
                            {opcion.nombre}
                        </Button>
                    ))}
                </Row>

                {/* ⚠️ Mensaje de resultado */}
                {resultado !== null && show && (
                    <Alert
                        show={show}
                        variant={resultado ? "success" : "danger"}
                        onClose={() => setShow(false)}
                        dismissible
                        className="mt-3 text-center w-50"
                    >
                        {resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                    </Alert>
                )}

                {/* 🧩 Botones de acción */}
                <Row className="w-100 d-flex justify-content-center gap-3 mt-4">
                    <Button
                        variant="success"
                        size="lg"
                        style={{ width: "200px", height: "60px" }}
                        onClick={comprobarRespuesta}
                    >
                        Comprobar
                    </Button>

                </Row>
            </>


            {/* NIVEL 2 */}


        </Container>
    );
}
