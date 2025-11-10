import { useState } from "react";
import dog from '../assets/img/Idog.jpg';
import monkey from '../assets/img/Imonkey.jpg';
import giraffe from '../assets/img/Igiraffe.jpg';
import tiger from '../assets/img/Itiger.jpg';

// Arreglo con los datos de los animales:
// Cada objeto contiene:
// - img: la imagen del animal
// - opcCorrecta: la respuesta correcta
// - opc: las opciones que se mostrarán al usuario
const animales = [
  { img: dog,     opcCorrecta: "Dog",     opc: ["Mouse", "Dog", "Horse"] },
  { img: monkey,  opcCorrecta: "Monkey",  opc: ["Monkey", "Bear", "Rabbit"] },
  { img: giraffe, opcCorrecta: "Giraffe", opc: ["Shark", "Giraffe", "Sheep"] },
  { img: tiger,   opcCorrecta: "Tiger",   opc: ["Cat", "Mouse", "Tiger"] }
];

// Componente principal del juego
// Recibe dos props:
// - contador: valor actual del contador de aciertos global
// - setContador: función para actualizar ese contador
export function JuegoEze({ contador, setContador }) {
  
  // Estado que guarda las respuestas seleccionadas por el usuario
  // Se almacena como un objeto, donde cada clave es el índice del animal
  // y su valor es la opción elegida
  const [respuesta, setRespuesta] = useState({});

  // Función que maneja el clic en una opción
  const manejarClick = (index, opcion) => {
    
    // Si ya se respondió este animal, no hace nada
    if (respuesta[index] !== undefined) return;

    // Guarda la respuesta elegida en el estado
    setRespuesta(prev => ({ ...prev, [index]: opcion }));

    // Verifica si la opción seleccionada es correcta
    const esCorrecta = opcion === animales[index].opcCorrecta;

    // Si es correcta, incrementa el contador global
    if (esCorrecta) {
      setContador(c => c + 1);
    }
  };

  // Calcula el total de respuestas correctas hasta el momento
  const totalCorrectas = animales.reduce((acc, animal, index) => {
    return respuesta[index] === animal.opcCorrecta ? acc + 1 : acc;
  }, 0);

  // Determina si el usuario ya respondió todos los animales
  const juegoTerminado = Object.keys(respuesta).length === animales.length;

  // Renderizado del componente
  return (
    <div className="text-center">
      <h1>Elige la opción correcta para cada animal</h1>
 
      {/* Contenedor principal con las imágenes y opciones */}
      <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
        {animales.map((animal, index) => (
          <div key={index} className="d-flex flex-column align-items-center">
            
            {/* Imagen del animal */}
            <img src={animal.img} alt="" className="img-thumbnail" width="300" height="300" />

            {/* Opciones de respuesta */}
            {animal.opc.map((opcion, i) => {
              const elegida = respuesta[index];       // Opción seleccionada por el usuario
              const esCorrecta = opcion === animal.opcCorrecta; // Verifica si es correcta
              const fueRespondida = elegida !== undefined;      // Indica si ya se respondió este animal

              // Determina el color del botón según el estado de la respuesta
              let color = "primary"; // Color por defecto (azul)
              if (fueRespondida) {
                if (opcion === elegida) {
                  // Si fue la elegida, se marca en verde (correcta) o rojo (incorrecta)
                  color = esCorrecta ? "success" : "danger";
                } else {
                  // Las otras opciones quedan en gris
                  color = "secondary";
                }
              }

              return (
                <button
                  key={i}
                  className={`btn btn-${color} btn-lg mt-2`}
                  style={{ width: '150px' }}
                  onClick={() => manejarClick(index, opcion)} // Llama a la función al hacer clic
                  disabled={fueRespondida} // Desactiva los botones una vez respondido
                >
                  {opcion}
                  {/* Si el juego terminó, muestra un ✅ junto a la respuesta correcta */}
                  {juegoTerminado && opcion === animal.opcCorrecta && " ✅"}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Muestra el puntaje final cuando el juego termina */}
      {juegoTerminado && (
        <h2 className="mt-4">
          Respuestas correctas: {totalCorrectas} de {animales.length}
        </h2>
      )}
    </div>
  );
}
