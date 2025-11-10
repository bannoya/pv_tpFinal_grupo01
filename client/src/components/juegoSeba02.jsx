import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

// 🔢 Lista de números con su valor y nombre en inglés
const NUMBERS = [
    { value: 1, en: "one" }, { value: 2, en: "two" }, { value: 3, en: "three" },
    { value: 4, en: "four" }, { value: 5, en: "five" }, { value: 6, en: "six" },
    { value: 7, en: "seven" }, { value: 8, en: "eight" }, { value: 9, en: "nine" },
    { value: 10, en: "ten" },
];

// 🧩 Función que elige un elemento aleatorio de un arreglo
function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 🔀 Función para mezclar un arreglo (Fisher-Yates shuffle)
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ❌ Función que selecciona opciones incorrectas (distractores)
// - pool: conjunto de todos los elementos
// - correct: el elemento correcto
// - k: cantidad de distractores
// - key: propiedad que se usará para comparar
function pickDistractors(pool, correct, k = 2, key = "en") {
    const candidates = pool.filter((x) => x[key] !== correct[key]);
    return shuffle(candidates).slice(0, k);
}

// 🎮 Componente principal del juego
export function JuegoSeba02({ contador, setContador, onFinish, variant = "numbers" }) {
    // Estados principales del juego
    const [prompt, setPrompt] = useState(null);     // Número mostrado (en cifra)
    const [correct, setCorrect] = useState(null);   // Objeto correcto (valor + texto)
    const [options, setOptions] = useState([]);     // Opciones disponibles (en inglés)
    const [resultado, setResultado] = useState(null); // Resultado de la selección
    const [show, setShow] = useState(false);        // Controla la visibilidad del mensaje

    // Control de rondas
    const [ronda, setRonda] = useState(1);
    const rondasMax = 3;                            // Cantidad total de rondas
    const [terminado, setTerminado] = useState(false); // Indica si terminó el juego

    // 🚀 Inicializa una nueva ronda
    function nuevaRonda() {
        setResultado(null);
        setShow(false);

        // Si el modo de juego es “numbers”
        if (variant === "numbers") {
            // Selecciona un número aleatorio correcto
            const c = rand(NUMBERS);

            // Elige 2 distractores que no sean el correcto
            const dist = pickDistractors(NUMBERS, c, 2, "en");

            // Combina el correcto con los distractores y mezcla el orden
            const opts = shuffle([c.en, ...dist.map((d) => d.en)]);

            // Actualiza los estados para mostrar la nueva ronda
            setPrompt(String(c.value)); // Muestra el número (por ejemplo “5”)
            setCorrect(c);              // Guarda el número correcto
            setOptions(opts);           // Muestra las opciones mezcladas
        }
    }

    // ⚙️ useEffect: se ejecuta al montar el componente o si cambia el tipo de juego
    useEffect(() => {
        nuevaRonda();
    }, [variant]);

    // 🖱️ Maneja el clic del usuario sobre una opción
    const manejarClick = (opt) => {
        // Si ya respondió o el juego terminó, no hace nada
        if (resultado !== null || terminado) return;

        // Verifica si la opción elegida es la correcta
        const ok = opt === correct.en;
        setResultado(ok);
        setShow(true);

        // Si acierta, incrementa el contador global
        if (ok) setContador((c) => c + 1);

        // Espera un tiempo antes de pasar a la siguiente ronda o finalizar
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

    // Si aún no hay datos de la ronda y el juego no ha terminado, no renderiza nada
    if (!correct && !terminado) return null;

    // 🧠 Renderizado del juego
    return (
        <Container fluid className="p-5 bg-light text-center text-dark">
            <Row className="mb-4 flex-column gap-4">
                {/* 🏁 Encabezado y progreso */}
                <h1>Elige el nombre correcto en inglés</h1>
                <p>
                    Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax}
                </p>

                {/* Si el juego no ha terminado, muestra el contenido */}
                {!terminado ? (
                    <>
                        {/* 📊 Muestra el número actual (por ejemplo “3”) */}
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
                                    minWidth: 160,
                                }}
                            >
                                {prompt}
                            </div>
                        </Col>

                        {/* 🎯 Botones con las opciones en inglés */}
                        <Col className="d-flex justify-content-center gap-3 flex-wrap">
                            {options.map((opt) => (
                                <button
                                    key={opt}
                                    className={`btn btn-outline-primary btn-lg`}
                                    style={{
                                        height: "100px",
                                        width: "200px",
                                        marginTop: "50px",
                                        border: "3px solid transparent",
                                        borderRadius: "10px",
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                    onClick={() => manejarClick(opt)}
                                    disabled={resultado !== null}
                                >
                                    {opt}
                                </button>
                            ))}
                        </Col>

                        {/* ✅❌ Mensaje de resultado */}
                        {resultado !== null && show && (
                            <Alert
                                show={show}
                                variant={resultado ? "success" : "danger"}
                                className="mt-3"
                            >
                                {resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                            </Alert>
                        )}
                    </>
                ) : (
                    // 🎉 Pantalla final cuando se completan todas las rondas
                    <div className="mt-4">
                        <h2 className="mb-3">🎉 ¡Juego completado!</h2>
                    </div>
                )}
            </Row>
        </Container>
    );
}
