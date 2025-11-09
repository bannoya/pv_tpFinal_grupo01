import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import recogerSound from "../assets/sound/recoger.mp3";
import winSound from "../assets/sound/win.mp3";


export default function Estrella() {

    // Estado que guarda el puntaje actual del jugador
    const [puntaje, setPuntaje] = useState(0);

    // Estado que guarda la posición (x, y) de la estrella en pantalla
    const [posicionEstrella, setPosicionEstrella] = useState({ y: 0, x: 0 });

    // Estado que controla si la estrella es visible o no
    const [visible, setVisible] = useState(false);

    // Estado que muestra un mensaje de victoria
    const [mensaje, setMensaje] = useState("");

    // Estado que indica si el juego está activo o detenido
    const [juegoActivo, setJuegoActivo] = useState(false);

    // Crea objetos de audio para los sonidos del juego
    const sonidoRecoger = new Audio(recogerSound);
    const sonidoGanar = new Audio(winSound);



    // Función para generar una posición aleatoria en la pantalla
    const posicionAlAzar = () => {
        const x = Math.random() * 80 + 10; // Valor aleatorio entre 10% y 90% en el eje X
        const y = Math.random() * 80 + 10; // Valor aleatorio entre 10% y 90% en el eje Y
        setPosicionEstrella({ x, y });     // Actualiza la posición de la estrella
    };


    // useEffect que mueve la estrella cada cierto tiempo mientras el juego esté activo
    useEffect(() => {
        const intervalo = setInterval(() => {
            if (juegoActivo) {
                posicionAlAzar();   // Cambia la posición aleatoriamente
                setVisible(true);   // Hace visible la estrella
            }
        }, 1000); // Cada 1 segundo

        // Limpia el intervalo cuando el componente se desmonta o el juego se detiene
        return () => clearInterval(intervalo);
    }, [juegoActivo]); // Solo se ejecuta cuando cambia el estado "juegoActivo"


    // Función que se ejecuta al hacer clic en la estrella
    const agarrarEstrella = () => {
        setPuntaje((prev) => prev + 1); // Incrementa el puntaje
        sonidoRecoger.currentTime = 0;  // Reinicia el sonido
        sonidoRecoger.play();            // Reproduce el sonido de recoger
        setVisible(false);              // Oculta la estrella temporalmente
    };


    // useEffect que detecta si el jugador ha ganado
    useEffect(() => {
        if (puntaje >= 10) {              // Si el puntaje llega a 10 o más
            setJuegoActivo(false);        // Detiene el juego
            setMensaje("¡Ganaste! 🎉");   // Muestra mensaje de victoria
            setVisible(false);            // Oculta la estrella
            sonidoGanar.play();           // Reproduce el sonido de ganar
        }
    }, [puntaje]); // Se ejecuta cada vez que cambia el puntaje



    // Reinicia todo para comenzar un nuevo juego
    const reiniciarJuego = () => {
        setPuntaje(0);        // Reinicia el puntaje
        setMensaje("");       // Borra el mensaje
        setJuegoActivo(true); // Activa el juego
        setVisible(false);    // Oculta la estrella hasta que aparezca aleatoriamente
    };



    // Renderizado del componente
    return (
        <div className="container-fluid bg-dark text-light d-flex flex-column align-items-center justify-content-center vh-100 position-relative">
            {/* Encabezado con el título y el puntaje */}
            <div className="text-center mb-3">
                <h1 className="fw-bold mb-3 text-warning">Atrapa las Estrellas </h1>
                <h4 className="mb-2">
                    Puntaje: <span className="text-info">{puntaje}</span>
                </h4>

                {/* Mensaje de victoria */}
                {mensaje && <h3 className="text-success fw-bold mt-3">{mensaje}</h3>}
            </div>


            {/* Estrella visible y activa: se muestra en una posición aleatoria */}
            {visible && juegoActivo && (
                <div
                    className="position-absolute estrella"
                    style={{
                        top: `${posicionEstrella.y}%`,   // Posición vertical
                        left: `${posicionEstrella.x}%`,  // Posición horizontal
                        fontSize: "2.5rem",              // Tamaño del icono
                        cursor: "pointer",               // Muestra el puntero al pasar por encima
                        transition: "transform 0.2s",    // Animación suave
                    }}
                    onClick={agarrarEstrella}             // Cuando se hace clic, se ejecuta la función
                >
                    ⭐
                </div>
            )}


            {/* Botón para iniciar o reiniciar el juego */}
            {!juegoActivo && (
                <button
                    className="btn btn-warning mt-4 fw-bold px-4 py-2"
                    onClick={reiniciarJuego}
                >
                    Iniciar Juego
                </button>
            )}
        </div>
    );
}
