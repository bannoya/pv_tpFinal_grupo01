import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import recogerSound from "../assets/sound/recoger.mp3";
import winSound from "../assets/sound/win.mp3";


export default function Estrella() {
    const [puntaje, setPuntaje] = useState(0);
    const [posicionEstrella, setPosicionEstrella] = useState({ y: 0, x: 0 });
    const [visible, setVisible] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [juegoActivo, setJuegoActivo] = useState(false);
    const sonidoRecoger = new Audio(recogerSound);
    const sonidoGanar = new Audio(winSound);



    const posicionAlAzar = () => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        setPosicionEstrella({ x, y });
    };


    useEffect(() => {
        const intervalo = setInterval(() => {
            if (juegoActivo) {
                posicionAlAzar();
                setVisible(true);
            }
        }, 1000);
        return () => clearInterval(intervalo);
    }, [juegoActivo]);


    const agarrarEstrella = () => {
        setPuntaje((prev) => prev + 1);
        sonidoRecoger.currentTime = 0;
        sonidoRecoger.play();
        setVisible(false);
    };


    useEffect(() => {
        if (puntaje >= 10) {
            setJuegoActivo(false);
            setMensaje("¡Ganaste! 🎉");
            setVisible(false);
            sonidoGanar.play();
        }
    }, [puntaje]);



    const reiniciarJuego = () => {
        setPuntaje(0);
        setMensaje("");
        setJuegoActivo(true);
        setVisible(false);
    };



    return (
        <div className="container-fluid bg-dark text-light d-flex flex-column align-items-center justify-content-center vh-100 position-relative">
            <div className="text-center mb-3">
                <h1 className="fw-bold mb-3 text-warning">Atrapa las Estrellas </h1>
                <h4 className="mb-2">Puntaje: <span className="text-info">{puntaje}</span></h4>
                {mensaje && <h3 className="text-success fw-bold mt-3">{mensaje}</h3>}

            </div>


            {visible && juegoActivo && (
                <div
                    className="position-absolute estrella"
                    style={{
                        top: `${posicionEstrella.y}%`,
                        left: `${posicionEstrella.x}%`,
                        fontSize: "2.5rem",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                    }}
                    onClick={agarrarEstrella}
                >
                    ⭐
                </div>
            )}


            {!juegoActivo && (
                <button className="btn btn-warning mt-4 fw-bold px-4 py-2" onClick={reiniciarJuego}>
                    Iniciar Juego
                </button>
            )}
        </div>
    );
}