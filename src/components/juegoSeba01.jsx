import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

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

export function JuegoSeba01() {
    const [choices, setChoices] = useState([]);
    const [target, setTarget] = useState(null);
    const [seleccion, setSeleccion] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [show, setShow] = useState(false);

    function nuevaRonda() {
        const opts = pickN(COLORS, 4);
        const tgt = rand(opts);
        setChoices(opts);
        setTarget(tgt);
        setSeleccion(null);
        setResultado(null);
        setShow(false);
    }

    useEffect(() => {
        nuevaRonda();
    }, []);

    const comprobar = () => {
        if (!seleccion) return;
        const ok = seleccion === target.key;
        setResultado(ok);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            nuevaRonda();
        }, ok ? 800 : 1000);
    };

    if (!target) return null;

    return (

        <Container fluid className="p-5 bg-light text-center">
            <Row className="mb-4 flex-column gap-4">
                <h1>Selecciona el color correcto</h1>

         
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
                            className={`btn btn-outline-primary btn-lg ${seleccion === c.key ? "active" : ""}`}
                            style={{
                                height: "100px",
                                width: "200px",
                                backgroundColor: c.hex,
                                border: seleccion === c.key ? "5px solid #07641bff" : "3px solid transparent",
                                boxShadow: seleccion === c.key ? "0 0 15px #07641bff" : "none",
                                borderRadius: "10px",
                                transition: "all 0.2s ease-in-out",
                            }}
                            onClick={() => setSeleccion(c.key)}
                        />
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

    )
}
