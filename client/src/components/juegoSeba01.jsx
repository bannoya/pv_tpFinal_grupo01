import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

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

const pickN = (arr, n) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
};
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function JuegoSeba01({ contador, setContador, onFinish }) {
    const [choices, setChoices] = useState([]);
    const [target, setTarget] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);

    const [ronda, setRonda] = useState(1);
    const rondasMax = 3;
    const [terminado, setTerminado] = useState(false);

    function nuevaRonda() {
        const opts = pickN(COLORS, 4);
        const tgt = rand(opts);
        setChoices(opts);
        setTarget(tgt);
        setResultado(null);
        setShow(false);
    }

    useEffect(() => {
        nuevaRonda();
    }, []);

    const manejarClick = (colorKey) => {
        if (resultado !== null || terminado) return;

        const ok = colorKey === target.key;
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

    if (!target && !terminado) return null;

    return (
        <Container fluid className="p-5 bg-light text-center">
            <h1>Selecciona el color correcto</h1>
            <p className="mb-2">
                Ronda <strong>{Math.min(ronda, rondasMax)}</strong> de {rondasMax} ·{" "}

            </p>

            {!terminado ? (
                <>
                    <Row className="flex-column gap-4">
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
                <div className="mt-4">
                    <h2 className="mb-3">🎉 ¡Juego completado!</h2>


                </div>
            )}
        </Container>
    );
}
