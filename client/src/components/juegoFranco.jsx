import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

// Importación de sonidos individuales
import cat from "../assets/sound/cat.mp3";
import dog from "../assets/sound/dog.mp3";
import cats from "../assets/sound/cats.mp3";
import dogs from "../assets/sound/dogs.mp3";
import cow from "../assets/sound/cow.mp3";
import horse from "../assets/sound/horse.mp3";
import rooster from "../assets/sound/rooster.mp3";

// Hook de contexto para manejar el tema (modo claro/oscuro)
import { useTheme } from "../context/ThemeContext.jsx";

// Lista de sonidos con su nombre e identificador
const sonidos = [
    { id: 1, nombre: "Perro", audio: dog },
    { id: 2, nombre: "Gato", audio: cat },
    { id: 3, nombre: "Gatos", audio: cats },
    { id: 4, nombre: "Perros", audio: dogs },
    { id: 5, nombre: "Vaca", audio: cow },
    { id: 6, nombre: "Caballo", audio: horse },
    { id: 7, nombre: "Gallo", audio: rooster },
];

// Función auxiliar para mezclar los elementos de un arreglo aleatoriamente
const mezclar = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Componente principal del juego de sonidos
export function JuegoFranco({ contador, setContador, onFinish }) {
    // Obtiene el valor de modo oscuro desde el contexto (aunque no se usa directamente aquí)
    const { darkMode } = useTheme();

    // Estado que guarda el sonido actual seleccionado para la ronda
    const [audioSeleccionado, setAudioSeleccionado] = useState(null);

    // Opciones que se mostrarán (una correcta y tres incorrectas)
    const [opciones, setOpciones] = useState([]);

    // Guarda si la respuesta fue correcta (true) o incorrecta (false)
    const [resultado, setResultado] = useState(null);

    // Controla si se muestra el mensaje de resultado (Alert)
    const [show, setShow] = useState(false);

    // Bloquea la interacción cuando se espera pasar de ronda
    const [bloqueado, setBloqueado] = useState(false);

    // Control de rondas
    const [ronda, setRonda] = useState(1);
    const rondasMax = 3; // Número total de rondas
    const [terminado, setTerminado] = useState(false); // Estado del juego (finalizado o no)

    // --- FUNCIÓN: Genera una nueva ronda ---
    function nuevaRonda() {
        // Selecciona un sonido al azar de la lista
        const seleccionado = sonidos[Math.floor(Math.random() * sonidos.length)];

        // Filtra los sonidos incorrectos (diferentes al seleccionado) y toma 3 al azar
        const incorrectas = mezclar(sonidos.filter(s => s.id !== seleccionado.id)).slice(0, 3);

        // Combina la opción correcta con las incorrectas y las mezcla
        const opcionesFinales = mezclar([seleccionado, ...incorrectas]);

        // Actualiza los estados para la nueva ronda
        setAudioSeleccionado(seleccionado);
        setOpciones(opcionesFinales);
        setResultado(null);
        setShow(false);
        setBloqueado(false);
    }

    // --- useEffect inicial ---
    // Se ejecuta una sola vez cuando el componente se monta, para iniciar la primera ronda
    useEffect(() => {
        nuevaRonda();
    }, []);

    // --- FUNCIÓN: Reproduce el sonido seleccionado ---
    const playAudio = () => {
        if (!audioSeleccionado) return;
        const audio = new Audio(audioSeleccionado.audio);
        audio.play();
    };

    // --- FUNCIÓN: Maneja la selección del usuario ---
    const manejarClick = (opcion) => {
        // Si el juego está bloqueado, ya respondió o terminó, no hace nada
        if (bloqueado || resultado !== null || terminado) return;

        // Verifica si la opción seleccionada es correcta
        const ok = opcion.nombre === audioSeleccionado.nombre;

        // Guarda el resultado (true/false)
        setResultado(ok);
        setShow(true); // Muestra el mensaje de resultado
        setBloqueado(true); // Bloquea los botones para evitar más clics

        // Si es correcta, incrementa el contador global
        if (ok) setContador((c) => c + 1);

        // Espera un tiempo y luego pasa a la siguiente ronda o termina el juego
        setTimeout(() => {
            setShow(false);
            if (ronda < rondasMax) {
                setRonda((r) => r + 1);
                nuevaRonda();
            } else {
                setTerminado(true);
            }
        }, ok ? 800 : 1000); // Tiempo de espera: más corto si acierta
    };

    // Si no hay audio seleccionado y el juego no terminó, no muestra nada aún
    if (!audioSeleccionado && !terminado) return null;

    // --- Renderizado del componente ---
    return (
        <Container
            fluid
            className={`p-1 bg-light text-center text-dark`}
        >
            {/* Encabezado del juego */}
            <Row className="mb-3 flex-column gap-2">
                <h1>Selecciona la opción correcta según el audio</h1>
                <p className="mb-0">
                    Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax} ·{" "}
                    Contador global: <strong>{contador}</strong>
                </p>
            </Row>

            {/* Si el juego aún no terminó */}
            {!terminado ? (
                <>
                    {/* Botón para reproducir el audio */}
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

                    {/* Opciones de respuesta */}
                    <Row
                        className="d-flex flex-wrap justify-content-center gap-3 p-4 rounded shadow-sm"
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

                    {/* Alerta de resultado (Correcto / Incorrecto) */}
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
                // Cuando el juego termina
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>
                </div>
            )}
        </Container>
    );
}
