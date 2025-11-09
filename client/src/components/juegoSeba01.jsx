import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

// 🎨 Lista de colores disponibles para el juego
// Cada color tiene una clave, un nombre legible y su valor hexadecimal
const COLORS = [
    { key: "red", label: "Red", hex: "#ff0000ff" },
    { key: "blue", label: "Blue", hex: "#1100ffff" },
    { key: "green", label: "Green", hex: "#095f14ff" },
    { key: "yellow", label: "Yellow", hex: "#ffe600ff" },
    { key: "purple", label: "Purple", hex: "#5d00ffff" },
    { key: "orange", label: "Orange", hex: "#e68a35ff" },
    { key: "pink", label: "Pink", hex: "#f282e3ff" },
    { key: "black", label: "Black", hex: "#000000" },
];

// 🔀 Función que elige N elementos aleatorios del array recibido
const pickN = (arr, n) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
};

// 🎯 Función auxiliar para obtener un elemento aleatorio del array
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function JuegoSeba01({ contador, setContador, onFinish }) {
    // 🎮 Estados principales del juego
    const [choices, setChoices] = useState([]); // Colores mostrados en pantalla
    const [target, setTarget] = useState(null); // Color que el jugador debe adivinar
    const [resultado, setResultado] = useState(null); // Resultado de la ronda (correcto o incorrecto)
    const [show, setShow] = useState(false); // Controla la visibilidad del mensaje de resultado

    // 🔁 Control de las rondas
    const [ronda, setRonda] = useState(1);
    const rondasMax = 3; // Número total de rondas
    const [terminado, setTerminado] = useState(false); // Indica si el juego terminó

    // 🚀 Función que inicializa una nueva ronda
    function nuevaRonda() {
        const opts = pickN(COLORS, 4); // Selecciona 4 colores aleatorios
        const tgt = rand(opts);        // Elige uno de esos colores como el objetivo
        setChoices(opts);
        setTarget(tgt);
        setResultado(null);
        setShow(false);
    }

    // ⚙️ useEffect se ejecuta una sola vez al montar el componente
    // para iniciar la primera ronda
    useEffect(() => {
        nuevaRonda();
    }, []);

    // 🖱️ Maneja el clic del usuario sobre un color
    const manejarClick = (colorKey) => {
        // Si ya se respondió o el juego terminó, no hace nada
        if (resultado !== null || terminado) return;

        // Compara si la opción elegida es correcta
        const ok = colorKey === target.key;
        setResultado(ok);
        setShow(true);

        // Si acierta, aumenta el contador global
        if (ok) setContador((c) => c + 1);

        // Después de un breve tiempo pasa a la siguiente ronda o termina el juego
        setTimeout(() => {
            setShow(false);
            if (ronda < rondasMax) {
                setRonda((r) => r + 1);
                nuevaRonda();
            } else {
                setTerminado(true);
            }
        }, ok ? 700 : 900);
    };

    // Mientras el target no esté definido y el juego no haya terminado, no renderiza nada
    if (!target && !terminado) return null;

    return (
        <Container fluid className="p-5 bg-light text-center text-dark">
            {/* 🏁 Título del juego y contador de ronda */}
            <h1>Selecciona el color correcto</h1>
            <p className="mb-2">
                Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax}
            </p>

            {/* Si el juego no ha terminado, muestra los botones de colores */}
            {!terminado ? (
                <>
                    <Row className="flex-column gap-4">
                        {/* Muestra el nombre del color objetivo */}
                        <Col>
                            <div
                                className="mx-auto"
                                style={{
                                    display: "inline-block",
                                    padding: "8px 18px",
                                    borderRadius: 12,
                                    border: "1px solid #eee",
                                    fontWeight: 600,
                                    fontSize: 22,
                                }}
                            >
                                {target.label}
                            </div>
                        </Col>

                        {/* Muestra los 4 botones de colores posibles */}
                        <Col className="d-flex justify-content-center gap-3 flex-wrap">
                            {choices.map((c) => (
                                <button
                                    key={c.key}
                                    className="btn btn-outline-primary btn-lg"
                                    style={{
                                        height: "100px",
                                        width: "200px",
                                        backgroundColor: c.hex,
                                        border: "3px solid transparent",
                                        borderRadius: "10px",
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                    onClick={() => manejarClick(c.key)}
                                    disabled={resultado !== null}
                                    aria-label={c.label}
                                    title={c.label}
                                />
                            ))}
                        </Col>

                        {/* 🧩 Mensaje de feedback (correcto o incorrecto) */}
                        <div>
                            {resultado !== null && show && (
                                <Alert
                                    show={show}
                                    variant={resultado ? "success" : "danger"}
                                    className="mt-3"
                                >
                                    {resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                                </Alert>
                            )}
                        </div>
                    </Row>
                </>
            ) : (
                // 🎉 Pantalla final cuando se completan todas las rondas
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>
                </div>
            )}
        </Container>
    );
}
