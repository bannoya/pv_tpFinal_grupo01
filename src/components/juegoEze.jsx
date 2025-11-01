import { useState } from "react";
import dog from '../assets/img/Idog.jpg';
import monkey from '../assets/img/Imonkey.jpg';
import giraffe from '../assets/img/Igiraffe.jpg';
import tiger from '../assets/img/Itiger.jpg';

const animales = [
    { img: dog, opcCorrecta: "Dog", opc: ["Mouse", "Dog", "Horse"] },
    { img: monkey, opcCorrecta: "Monkey", opc: ["Monkey", "Bear", "Rabbit"] },
    { img: giraffe, opcCorrecta: "Giraffe", opc: ["Shark", "Giraffe", "Sheep"] },
    { img: tiger, opcCorrecta: "Tiger", opc: ["Cat", "Mouse", "Tiger"] }
];

export function JuegoEze() {
    const [respuesta, setRespuesta] = useState({});

    const manejarClick = (index, opcion) => {
        setRespuesta(prev => ({
            ...prev,
            [index]: opcion
        }));
    };
    const totalCorrectas = animales.reduce((acc, animal, index) => {
        return respuesta[index] === animal.opcCorrecta ? acc + 1 : acc;
    }, 0);

    const juegoTerminado = Object.keys(respuesta).length === animales.length;


    return (
        <div className="text-center">
            <h1>Elige la opción correcta para cada animal</h1>
            <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
                {animales.map((animal, index) => (
                    <div key={index} className="d-flex flex-column align-items-center">
                        <img src={animal.img} alt="" className="img-thumbnail" width="300" height="300" />
                        {animal.opc.map((opcion, i) => {
                            const elegida = respuesta[index];
                            const esCorrecta = opcion === animal.opcCorrecta;
                            const fueRespondida = elegida !== undefined;
                            let color = "primary";

                            if (fueRespondida) {
                                if (opcion === elegida) {
                                    color = esCorrecta ? "success" : "danger";
                                } else {
                                    color = "secondary";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    className={`btn btn-${color} btn-lg mt-2`}
                                    style={{ width: '150px' }}
                                    onClick={() => manejarClick(index, opcion)}
                                    disabled={fueRespondida}
                                >
                                    {opcion}
                                    {juegoTerminado && opcion === animal.opcCorrecta && " ✅"}


                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            {juegoTerminado && (
                <h2 className="mt-4">Respuestas correctas: {totalCorrectas} de {animales.length}</h2>
            )}
        </div>
    );
}