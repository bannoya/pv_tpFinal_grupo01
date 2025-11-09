import React, { useState, useEffect } from "react";
import { Container, Row, Alert, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx"; // Importa el contexto del tema (modo claro/oscuro)

// Importación de archivos de audio que se usan en el juego
import oracion1 from "../assets/sound/oracion1.mp3";
import oracion2 from "../assets/sound/oracion2.mp3";
import oracion3 from "../assets/sound/oracion3.mp3";
import oracion4 from "../assets/sound/oracion4.mp3";

// Lista de oraciones con su traducción y audio correspondiente
const oraciones = [
    { id: 1, aTexto: "Sorry, but Mr. Lee is not here", texto: "Lo siento pero el señor Lee no está aquí", audio: oracion1 },
    { id: 2, aTexto: "", texto: "Excuse me are you Mrs. Smith", audio: oracion2 },
    { id: 3, aTexto: "", texto: "Have a nice night Anna", audio: oracion3 },
    { id: 4, aTexto: "Have a nice night, Anna!", texto: "Que tengas una buena noche Anna", audio: oracion3 },
    { id: 5, aTexto: "", texto: "Sorry but the doctor is not here", audio: oracion4 },
];

// Función para mezclar el orden de los elementos en un array (aleatorizar)
const mezclar = (arr) => [...arr].sort(() => Math.random() - 0.5);

export function JuegoFranco2({ contador, setContador, onTerminar }) {
    const { darkMode } = useTheme(); // Permite adaptar el estilo al modo oscuro si se usa

    // Estados del juego
    const [oracionActual, setOracionActual] = useState(null); // Oración seleccionada
    const [palabras, setPalabras] = useState([]); // Palabras desordenadas
    const [resultado, setResultado] = useState(null); // Si la respuesta fue correcta o incorrecta
    const [show, setShow] = useState(false); // Controla la visibilidad del mensaje
    const [dragIndex, setDragIndex] = useState(null); // Índice del elemento arrastrado
    const [bloqueado, setBloqueado] = useState(false); // Evita interacciones mientras se valida

    // Control de rondas
    const [ronda, setRonda] = useState(1);
    const rondasMax = 3; // Número máximo de rondas
    const [terminado, setTerminado] = useState(false); // Indica si el juego terminó

    // useEffect que inicia la primera ronda al cargar el componente
    useEffect(() => {
        nuevaRonda();
    }, []);

    // Función que configura una nueva ronda
    function nuevaRonda() {
        const seleccionada = oraciones[Math.floor(Math.random() * oraciones.length)]; // Elige una oración al azar
        setOracionActual(seleccionada);
        setPalabras(mezclar(seleccionada.texto.split(" "))); // Divide el texto en palabras y las mezcla
        setResultado(null);
        setShow(false);
        setDragIndex(null);
        setBloqueado(false);
    }

    // Reproduce el audio de la oración actual
    const playAudio = () => {
        if (!oracionActual) return;
        new Audio(oracionActual.audio).play();
    };

    // Guarda el índice de la palabra que se comienza a arrastrar
    const handleDragStart = (index) => {
        if (bloqueado || terminado) return;
        setDragIndex(index);
    };

    // Cuando se suelta una palabra, cambia su posición dentro del array
    const handleDrop = (index) => {
        if (bloqueado || terminado || dragIndex === null) return;
        const newPalabras = [...palabras];
        const [moved] = newPalabras.splice(dragIndex, 1); // Extrae la palabra movida
        newPalabras.splice(index, 0, moved); // La inserta en la nueva posición
        setPalabras(newPalabras);
        setDragIndex(null);
    };

    // Permite soltar elementos arrastrables
    const handleDragOver = (e) => e.preventDefault();

    // Verifica si el orden de las palabras coincide con la oración original
    const comprobarRespuesta = () => {
        if (bloqueado || terminado || !oracionActual) return;
        const respuesta = palabras.join(" "); // Junta las palabras en una cadena
        const ok = respuesta === oracionActual.texto; // Compara con la oración correcta

        setResultado(ok);
        setShow(true);
        setBloqueado(true);

        // Si es correcta, aumenta el contador global
        if (ok) setContador((c) => c + 1);

        // Espera un momento antes de pasar a la siguiente ronda o finalizar
        setTimeout(() => {
            setShow(false);
            if (ronda < rondasMax) {
                setRonda((r) => r + 1);
                nuevaRonda();
            } else {
                setTerminado(true);
                onTerminar?.(); // Llama al callback si está definido
            }
        }, ok ? 900 : 1100);
    };

    // Si aún no hay oración cargada y el juego no terminó, no muestra nada
    if (!oracionActual && !terminado) return null;

    return (
        <Container
            fluid
            className={`p-2 d-flex flex-column align-items-center text-center bg-light text-dark`}
            style={{ minHeight: "60vh" }}
        >
            {/* Título y contador */}
            <Row className="w-100 mb-3">
                <h1 className="fw-bold">Ordená la oración escuchando el audio</h1>
                <p className="mb-0">
                    Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax} ·{" "}
                    Contador global: <strong>{contador}</strong>
                </p>
            </Row>

            {/* Si el juego no terminó, muestra el contenido principal */}
            {!terminado ? (
                <>
                    {/* Botón para reproducir el audio */}
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

                    {/* Zona de palabras desordenadas que el usuario debe ordenar */}
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

                    {/* Muestra si la respuesta fue correcta o incorrecta */}
                    {resultado !== null && show && (
                        <Alert
                            show={show}
                            variant={resultado ? "success" : "danger"}
                            className="mt-4 w-50 text-center"
                        >
                            {resultado ? "¡Correcto! 🎉" : "Incorrecto, revisá el orden e intentá de nuevo."}
                        </Alert>
                    )}

                    {/* Botón para comprobar la respuesta */}
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
                // Pantalla final cuando se completan las rondas
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>
                </div>
            )}
        </Container>
    );
}
