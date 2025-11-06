import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
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

const mezclar = (arr) => [...arr].sort(() => Math.random() - 0.5);

export function JuegoFranco({ contador, setContador, onFinish }) {
    const { darkMode } = useTheme();

    const [audioSeleccionado, setAudioSeleccionado] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);
    const [bloqueado, setBloqueado] = useState(false);


    const [ronda, setRonda] = useState(1);
    const rondasMax = 3;
    const [terminado, setTerminado] = useState(false);

    function nuevaRonda() {

        const seleccionado = sonidos[Math.floor(Math.random() * sonidos.length)];

        const incorrectas = mezclar(sonidos.filter(s => s.id !== seleccionado.id)).slice(0, 3);

        const opcionesFinales = mezclar([seleccionado, ...incorrectas]);

        setAudioSeleccionado(seleccionado);
        setOpciones(opcionesFinales);
        setResultado(null);
        setShow(false);
        setBloqueado(false);
    }

    useEffect(() => {
        nuevaRonda();

    }, []);

    const playAudio = () => {
        if (!audioSeleccionado) return;
        const audio = new Audio(audioSeleccionado.audio);
        audio.play();
    };

    const manejarClick = (opcion) => {
        if (bloqueado || resultado !== null || terminado) return;

        const ok = opcion.nombre === audioSeleccionado.nombre;
        setResultado(ok);
        setShow(true);
        setBloqueado(true);
        if (ok) setContador((c) => c + 1);

        setTimeout(() => {
            setShow(false);
            if (ronda < rondasMax) {
                setRonda((r) => r + 1);
                nuevaRonda();
            } else {
                setTerminado(true);
            }
        }, ok ? 800 : 1000);
    };

    if (!audioSeleccionado && !terminado) return null;

    return (
        <Container
            fluid
            className={`p-5 text-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
            style={{
                minHeight: "80vh",
                background: darkMode
                    ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)"
                    : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <Row className="mb-3 flex-column gap-2">
                <h1>Selecciona la opción correcta según el audio</h1>
                <p className="mb-0">
                    Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax} ·{" "}
                    Contador global: <strong>{contador}</strong>
                </p>
            </Row>

            {!terminado ? (
                <>
                    <Row className="w-100 d-flex justify-content-center mb-4">
                        <Button
                            variant="success"
                            size="lg"
                            style={{ height: 80, width: 220 }}
                            onClick={playAudio}
                            disabled={bloqueado}
                        >
                            ▶️ Escuchar Audio
                        </Button>
                    </Row>

                    <Row
                        className="d-flex flex-wrap justify-content-center gap-3 p-4 rounded shadow-sm"
                        style={{
                            minHeight: 120,
                            width: "80%",
                            margin: "0 auto",
                            backgroundColor: darkMode ? "#222" : "#fff",
                            border: darkMode ? "1px solid #333" : "1px solid #eee",
                        }}
                    >
                        {opciones.map((op) => (
                            <Button
                                key={op.id}
                                variant="outline-primary"
                                className="btn-lg"
                                style={{
                                    height: 80,
                                    width: 220,
                                    borderRadius: 10,
                                    transition: "all 0.2s ease-in-out",
                                }}
                                onClick={() => manejarClick(op)}
                                disabled={bloqueado}
                            >
                                {op.nombre}
                            </Button>
                        ))}
                    </Row>

                    {resultado !== null && show && (
                        <Alert
                            show={show}
                            variant={resultado ? "success" : "danger"}
                            className="mt-3 text-center"
                            style={{ width: "50%", margin: "16px auto 0" }}
                        >
                            {resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                        </Alert>
                    )}
                </>
            ) : (
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>



                </div>
            )
            }
        </Container >
    );
}
