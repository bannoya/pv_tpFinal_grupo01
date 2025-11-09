// Importamos dependencias principales de React
import React, { useState, useEffect, useRef } from "react";
// Importamos componentes de Bootstrap
import { Button } from "react-bootstrap";
// Importamos los distintos juegos usados en el diagnóstico
import { JuegoEze } from "../components/juegoEze.jsx";
import { JuegoSeba01 } from "../components/juegoSeba01.jsx";
import { JuegoSeba02 } from "../components/juegoSeba02.jsx";
import { JuegoFranco } from "../components/juegoFranco.jsx";
import { JuegoFranco2 } from "../components/JuegoFranco2.jsx";
// Importamos el componente de resultados finales
import { ResultadosDiagnostico } from "../components/ResultadosDiagnostico.jsx";
// Importamos el hook de autorización (para acceder a datos del usuario)
import { useAutorizacion } from "../hooks/useAutorizacion.js";

// Componente principal del diagnóstico
export function Diagonostico() {
  // Estado para controlar el nivel actual (1 a 6)
  const [nivel, setNivel] = useState(1);
  // Estado global del contador (puntuación acumulada)
  const [contador, setContador] = useState(0);
  // Estado para saber si el nivel 5 fue completado
  const [nivel5Listo, setNivel5Listo] = useState(false);
  
  // Hook personalizado para obtener el usuario y la función de guardar puntaje
  const { user, saveScore } = useAutorizacion();

  // Referencia para evitar múltiples guardados del resultado
  const guardadoRef = useRef(false);
  // Estados para manejar la UI del guardado
  const [guardando, setGuardando] = useState(false);
  const [errorSave, setErrorSave] = useState("");
  const [okSave, setOkSave] = useState(false);

  // Función para avanzar de nivel (máximo nivel 6)
  const irNivel = () => setNivel((n) => Math.min(n + 1, 6));

  // Efecto que guarda el resultado una sola vez al alcanzar el nivel 6
  useEffect(() => {
    const persist = async () => {
      // Si el usuario no tiene username, no guardamos nada
      if (!user?.username) return;
      // Si ya se guardó antes, no se vuelve a guardar
      if (guardadoRef.current) return; 
      guardadoRef.current = true; // marcamos como guardado

      // Reiniciamos los estados visuales
      setGuardando(true);
      setErrorSave("");
      setOkSave(false);

      // Enviamos el puntaje al servidor usando la función saveScore()
      const result = await saveScore({ username: user.username, score: contador });

      // Terminamos el proceso de guardado
      setGuardando(false);

      // Si hubo un error en el guardado, lo mostramos y habilitamos reintento
      if (!result.success) {
        setErrorSave(result.message || "No se pudo guardar el resultado");
        guardadoRef.current = false; // permitir reintento manual
        return;
      }
      // Si todo salió bien, mostramos confirmación
      setOkSave(true);
    };

    // Cuando el usuario llega al nivel 6, ejecutamos el guardado
    if (nivel === 6) {
      persist();
    }
  }, [nivel, contador, user, saveScore]);

  // Render del componente
  return (
    <div className="text-center mb-3">
      {/* Muestra el puntaje acumulado */}
      <h3>Contador Global: {contador}</h3>

      {/* Renderiza los distintos juegos según el nivel actual */}
      {nivel === 1 && <JuegoEze contador={contador} setContador={setContador} />}
      {nivel === 2 && <JuegoSeba01 contador={contador} setContador={setContador} />}
      {nivel === 3 && <JuegoSeba02 contador={contador} setContador={setContador} />}
      {nivel === 4 && <JuegoFranco contador={contador} setContador={setContador} />}

      {/* Nivel 5: muestra el último juego y el botón "Siguiente" al finalizar */}
      {nivel === 5 && (
        <>
          <JuegoFranco2
            contador={contador}
            setContador={setContador}
            onTerminar={() => setNivel5Listo(true)} // Marca nivel 5 como completado
          />
          {nivel5Listo && (
            <div className="px-8 py-3">
              <Button
                variant="primary"
                size="lg"
                style={{ width: "200px", height: "60px" }}
                onClick={() => setNivel(6)} // Avanza al nivel 6
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}

      {/* Nivel 6: muestra los resultados finales y mensajes de guardado */}
      {nivel === 6 && (
        <>
          <ResultadosDiagnostico contador={contador} totalJuegos={5} />
          {guardando && <p className="mt-3">Guardando resultado…</p>}
          {okSave && <p className="mt-3">✅ Resultado guardado en tu perfil.</p>}
          {errorSave && (
            <div className="mt-3">
              <p>❌ {errorSave}</p>
              {/* Permite reintentar guardar manualmente si falló */}
              <Button
                variant="warning"
                onClick={() => {
                  guardadoRef.current = false;
                  setOkSave(false);
                  setErrorSave("");
                  setNivel(6); // Re-dispara el useEffect para intentar nuevamente
                }}
              >
                Reintentar guardar
              </Button>
            </div>
          )}
        </>
      )}

      {/* Botón "Siguiente" visible solo entre los niveles 1 y 4 */}
      {nivel >= 1 && nivel <= 4 && (
        <div className="px-8 py-3">
          <Button
            variant="secondary"
            size="lg"
            style={{ width: "200px", height: "60px" }}
            onClick={irNivel} // Avanza al siguiente nivel
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
