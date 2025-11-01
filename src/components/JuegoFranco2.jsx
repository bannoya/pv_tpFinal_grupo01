import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";


import oracion1 from "../assets/sound/oracion1.mp3";
import oracion2 from "../assets/sound/oracion2.mp3";
import oracion3 from "../assets/sound/oracion3.mp3";
import oracion4 from "../assets/sound/oracion4.mp3";


const oraciones = [
    {
        id: 1,
        aTexto: "Sorry, but Mr. Lee is not here",
        texto: "Lo siento pero el señor Lee no está aquí",
        audio: oracion1,
    },
    {
        id: 2,
        aTexto: "",
        texto: "Excuse me are you Mrs. Smith",
        audio: oracion2,
    },
    {
        id: 3,
        aTexto: "",
        texto: "Have a nice night Anna",
        audio: oracion3,
    },

    {
        id: 4,
        aTexto: "Have a nice night, Anna!",
        texto: "Que tengas una buena noche Anna",
        audio: oracion3,
    },
    {
        id: 5,
        aTexto: "",
        texto: "Sorry but the doctor is not here",
        audio: oracion4,
    },
];


export function JuegoFranco2() {
    const { darkMode } = useTheme();
    const [oracionActual, setOracionActual] = useState(null);
    const [palabras, setPalabras] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        generarNuevaOracion();
    }, []);

    const mezclarArray = (array) => array.sort(() => Math.random() - 0.5);

    const generarNuevaOracion = () => {
        const randomIndex = Math.floor(Math.random() * oraciones.length);
        const seleccionada = oraciones[randomIndex];
        const palabrasDesordenadas = mezclarArray(seleccionada.texto.split(" "));
        setOracionActual(seleccionada);
        setPalabras(palabrasDesordenadas);
        setResultado(null);
        setShow(false);
    };

    const playAudio = () => {
        if (oracionActual) {
            const audio = new Audio(oracionActual.audio);
            audio.play();
        }
    };

    //  Manejo de drag & drop nativo
    const handleDragStart = (index) => setDragIndex(index);
    const handleDrop = (index) => {
        const newPalabras = [...palabras];
        const [moved] = newPalabras.splice(dragIndex, 1);
        newPalabras.splice(index, 0, moved);
        setPalabras(newPalabras);
        setDragIndex(null);
    };
    const handleDragOver = (e) => e.preventDefault();

    const comprobarRespuesta = () => {
        const respuesta = palabras.join(" ");
        const esCorrecto = respuesta === oracionActual.texto;
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
            <h1 className="mb-4">Nivel 2: Escucha y selecciona las palabras</h1>



            
            <Button
                variant="success"
                size="lg"
                className="mb-4 px-4 py-3"
                style={{
                    height: "auto",
                    width: "fit-content",
                    whiteSpace: "nowrap",
                }}
                onClick={playAudio}
                disabled={!oracionActual}
            >
                ▶️ {oracionActual ? oracionActual.aTexto : "Cargando..."}
            </Button>

            
            <div
                className="d-flex flex-wrap justify-content-center gap-3 border p-4 rounded bg-white shadow-sm"
                style={{
                    minHeight: "120px",
                    width: "80%",
                }}
            >
                {palabras.map((palabra, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDrop={() => handleDrop(index)}
                        onDragOver={handleDragOver}
                        className="btn btn-outline-primary fs-5"
                        style={{
                            userSelect: "none",
                            padding: "10px 20px",
                            borderRadius: "12px",
                            cursor: "grab",
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
                    onClose={() => setShow(false)}
                    dismissible
                    className="mt-4 w-50 text-center"
                >
                    {resultado
                        ? "¡Correcto! 🎉"
                        : "Incorrecto, intenta ordenar las palabras de nuevo."}
                </Alert>
            )}

           
            <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={comprobarRespuesta}
                    style={{ width: "200px", height: "60px" }}
                >
                    Comprobar
                </Button>

                {show && (
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={generarNuevaOracion}
                        style={{ width: "200px", height: "60px" }}
                    >
                        Siguiente
                    </Button>
                )}
            </div>
        </Container>
    );
}
