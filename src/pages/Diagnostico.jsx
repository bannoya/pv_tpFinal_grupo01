import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";
import { JuegoEze } from "../components/juegoEze.jsx";
import { JuegoFranco } from "../components/juegoFranco.jsx";
import { JuegoFranco2 } from "../components/JuegoFranco2.jsx";
import { JuegoSeba01 } from "../components/juegoSeba01.jsx";
import { JuegoSeba02 } from "../components/juegoSeba02.jsx";


export function Diagonostico() {
    const [nivel, setNivel] = useState(1)
    const irNivel = () => {
        if (nivel === 1) setNivel(2)
        if (nivel === 2) setNivel(3)
        if (nivel === 3) setNivel(4)
        if (nivel === 4) setNivel(5)
    };

    return (
        <div className="text-center mb-3 ">
            {nivel === 1 && <JuegoEze />}
            {nivel === 2 && <JuegoSeba01 />}
            {nivel === 3 && <JuegoSeba02 />}
            {nivel === 4 && <JuegoFranco />}
            {nivel === 5 && <JuegoFranco2 />}

            <div className="px-8 py-3">
                <Button

                    variant="secondary"
                    size="lg"
                    style={{ width: "200px", height: "60px" }}
                    onClick={irNivel}
                >
                    Siguiente
                </Button>
            </div>



        </div>






    )






}