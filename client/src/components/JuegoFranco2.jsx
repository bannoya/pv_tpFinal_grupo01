import React, { useState, useEffect } from "react";
import { Container, Row, Alert, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";

import oracion1 from "../assets/sound/oracion1.mp3";
import oracion2 from "../assets/sound/oracion2.mp3";
import oracion3 from "../assets/sound/oracion3.mp3";
import oracion4 from "../assets/sound/oracion4.mp3";

const oraciones = [
    { id: 1, aTexto: "Sorry, but Mr. Lee is not here", texto: "Lo siento pero el señor Lee no está aquí", audio: oracion1 },
    { id: 2, aTexto: "", texto: "Excuse me are you Mrs. Smith", audio: oracion2 },
    { id: 3, aTexto: "", texto: "Have a nice night Anna", audio: oracion3 },
    { id: 4, aTexto: "Have a nice night, Anna!", texto: "Que tengas una buena noche Anna", audio: oracion3 },
    { id: 5, aTexto: "", texto: "Sorry but the doctor is not here", audio: oracion4 },
];

const mezclar = (arr) => [...arr].sort(() => Math.random() - 0.5);

export function JuegoFranco2({ contador, setContador, onTerminar }) {
    const { darkMode } = useTheme();

    const [oracionActual, setOracionActual] = useState(null);
    const [palabras, setPalabras] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);
    const [bloqueado, setBloqueado] = useState(false);


    const [ronda, setRonda] = useState(1);
    const rondasMax = 3;
    const [terminado, setTerminado] = useState(false);

    useEffect(() => {
        nuevaRonda();

    }, []);

    function nuevaRonda() {
        const seleccionada = oraciones[Math.floor(Math.random() * oraciones.length)];
        setOracionActual(seleccionada);
        setPalabras(mezclar(seleccionada.texto.split(" ")));
        setResultado(null);
        setShow(false);
        setDragIndex(null);
        setBloqueado(false);
    }

    const playAudio = () => {
        if (!oracionActual) return;
        new Audio(oracionActual.audio).play();
    };


    const handleDragStart = (index) => {
        if (bloqueado || terminado) return;
        setDragIndex(index);
    };

    const handleDrop = (index) => {
        if (bloqueado || terminado || dragIndex === null) return;
        const newPalabras = [...palabras];
        const [moved] = newPalabras.splice(dragIndex, 1);
        newPalabras.splice(index, 0, moved);
        setPalabras(newPalabras);
        setDragIndex(null);
    };

    const handleDragOver = (e) => e.preventDefault();


    const comprobarRespuesta = () => {
        if (bloqueado || terminado || !oracionActual) return;
        const respuesta = palabras.join(" ");
        const ok = respuesta === oracionActual.texto;

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
                onTerminar?.();
            }
        }, ok ? 900 : 1100);
    };

    if (!oracionActual && !terminado) return null;

    return (
        <Container
            fluid
            className={`p-2 d-flex flex-column align-items-center text-center bg-light text-dark` }
            style={{
                minHeight: "60vh"}}>
            <Row className="w-100 mb-3">
                <h1 className="fw-bold">Ordená la oración escuchando el audio</h1>
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
                            style={{ height: 80, width: 260 }}
                            onClick={playAudio}
                            disabled={!oracionActual || bloqueado}
                        >
                            ▶️ {oracionActual?.aTexto || "Escuchar oración"}
                        </Button>
                    </Row>

                    <div
                        className="d-flex flex-wrap justify-content-center gap-3 p-4 rounded shadow-sm bg-light"
                        style={{
                            minHeight: 120,
                            width: "80%",
                            margin: "0 auto",

                        }}
                    >
                        {palabras.map((palabra, index) => (
                            <div
                                key={`${palabra}-${index}`}
                                draggable={!bloqueado}
                                onDragStart={() => handleDragStart(index)}
                                onDrop={() => handleDrop(index)}
                                onDragOver={handleDragOver}
                                className="btn btn-outline-primary fs-5 bg-light"
                                style={{
                                    userSelect: "none",
                                    padding: "10px 20px",
                                    borderRadius: 12,
                                    cursor: bloqueado ? "not-allowed" : "grab",
                                    opacity: dragIndex === index ? 0.5 : 1,
                                    transition: "opacity 0.2s ease",
                                }}
                            >
                                {palabra}
                            </div>
                        ))}
                    </div>

                    {resultado !== null && show && (
                        <Alert
                            show={show}
                            variant={resultado ? "success" : "danger"}
                            className="mt-4 w-50 text-center"
                        >
                            {resultado ? "¡Correcto! 🎉" : "Incorrecto, revisá el orden e intentá de nuevo."}
                        </Alert>
                    )}

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={comprobarRespuesta}
                            style={{ width: 220, height: 60 }}
                            disabled={bloqueado}
                        >
                            Comprobar
                        </Button>
                    </div>
                </>
            ) : (
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>
                </div>
            )}
        </Container>
    );
}
