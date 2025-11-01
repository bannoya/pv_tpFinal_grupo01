import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

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

export function JuegoSeba02({ variant = "numbers" }) {
    const [prompt, setPrompt] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [options, setOptions] = useState([]);
    const [seleccion, setSeleccion] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);

    function nuevaRonda() {
        setSeleccion(null);
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

    const comprobar = () => {
        if (!seleccion) return;
        const ok = seleccion === correct.en;
        setResultado(ok);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            nuevaRonda();
        }, ok ? 800 : 1000);
    };

    if (!correct) return null;

    return (
        <Container fluid className="p-5 bg-light text-center">
            <Row className="mb-4 flex-column gap-4">
                <h1>
                    {variant === "numbers" ? "Elige el nombre correcto en inglés" : "Elige el día correcto en inglés"}
                </h1>


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
                            className={`btn btn-outline-primary btn-lg ${seleccion === opt ? "active" : ""}`}
                            style={{
                                height: "100px",
                                width: "200px",
                                marginTop: "50px",
                                border: seleccion === opt ? "5px solid #07641bff" : "3px solid transparent",
                                boxShadow: seleccion === opt ? "0 0 15px #07641bff" : "none",
                                borderRadius: "10px",
                                transition: "all 0.2s ease-in-out",

                            }}
                            onClick={() => setSeleccion(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </Col>

                <div>
                    {resultado !== null && show && (
                        <Alert
                            show={show}
                            variant={resultado ? "success" : "danger"}
                            onClose={() => setShow(false)}
                            dismissible
                            className="mt-3"
                        >
                            {resultado ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                        </Alert>
                    )}
                </div>


                <Col>
                    <button
                        className="btn btn-success btn-lg"
                        style={{ height: "50px", width: "200px", marginTop: "10px" }}
                        onClick={comprobar}
                    >
                        Comprobar
                    </button>
                </Col>
            </Row>
        </Container>
    );
}
