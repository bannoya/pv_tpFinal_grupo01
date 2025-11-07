import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

const NUMBERS = [
    { value: 1, en: "one" }, { value: 2, en: "two" }, { value: 3, en: "three" },
    { value: 4, en: "four" }, { value: 5, en: "five" }, { value: 6, en: "six" },
    { value: 7, en: "seven" }, { value: 8, en: "eight" }, { value: 9, en: "nine" },
    { value: 10, en: "ten" },
];

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function pickDistractors(pool, correct, k = 2, key = "en") {
    const candidates = pool.filter((x) => x[key] !== correct[key]);
    return shuffle(candidates).slice(0, k);
}

export function JuegoSeba02({ contador, setContador, onFinish, variant = "numbers" }) {
    const [prompt, setPrompt] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [options, setOptions] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);

    const [ronda, setRonda] = useState(1);
    const rondasMax = 3;
    const [terminado, setTerminado] = useState(false);

    function nuevaRonda() {
        setResultado(null);
        setShow(false);

        if (variant === "numbers") {
            const c = rand(NUMBERS);
            const dist = pickDistractors(NUMBERS, c, 2, "en");
            const opts = shuffle([c.en, ...dist.map((d) => d.en)]);
            setPrompt(String(c.value));
            setCorrect(c);
            setOptions(opts);
        }
    }

    useEffect(() => {
        nuevaRonda();
    }, [variant]);

    const manejarClick = (opt) => {
        if (resultado !== null || terminado) return;
        const ok = opt === correct.en;
        setResultado(ok);
        setShow(true);
        if (ok) setContador((c) => c + 1);


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

    if (!correct && !terminado) return null;

    return (
        <Container fluid className="p-5 bg-light text-center text-dark">
            <Row className="mb-4 flex-column gap-4">
                <h1>Elige el nombre correcto en inglés</h1>
                <p>
                    Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax} ·{" "}

                </p>

                {!terminado ? (
                    <>
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
                    <div className="mt-4">
                        <h2 className="mb-3">🎉 ¡Juego completado!</h2>

                    </div>
                )}
            </Row>
        </Container>
    );
}
