import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { JuegoEze } from "../components/juegoEze.jsx";
import { JuegoSeba01 } from "../components/juegoSeba01.jsx";
import { JuegoSeba02 } from "../components/juegoSeba02.jsx";
import { JuegoFranco } from "../components/juegoFranco.jsx";
import { JuegoFranco2 } from "../components/JuegoFranco2.jsx";
import { ResultadosDiagnostico } from "../components/ResultadosDiagnostico.jsx";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

export function Diagonostico() {
  const [nivel, setNivel] = useState(1);
  const [contador, setContador] = useState(0);
  const [nivel5Listo, setNivel5Listo] = useState(false);
  

  const { user, saveScore } = useAutorizacion();

  // flags para control de guardado
  const guardadoRef = useRef(false);
  const [guardando, setGuardando] = useState(false);
  const [errorSave, setErrorSave] = useState("");
  const [okSave, setOkSave] = useState(false);

  const irNivel = () => setNivel((n) => Math.min(n + 1, 6));

  // Al entrar a nivel 6, persistimos el score una sola vez
  useEffect(() => {
  const persist = async () => {
    // Si usás username, no bloquees por _id
    if (!user?.username) return;
    if (guardadoRef.current) return; // ya se guardó
    guardadoRef.current = true;

    setGuardando(true);
    setErrorSave("");
    setOkSave(false);

    // ⬇️ guardá el resultado en una variable
    const result = await saveScore({ username: user.username, score: contador });

    setGuardando(false);

    if (!result.success) {
      setErrorSave(result.message || "No se pudo guardar el resultado");
      guardadoRef.current = false; // permitir reintento manual
      return;
    }
    setOkSave(true);
  };

  if (nivel === 6) {
    persist();
  }
}, [nivel, contador, user, saveScore]);


  return (
    <div className="text-center mb-3">
      <h3>Contador Global: {contador}</h3>

      {nivel === 1 && <JuegoEze contador={contador} setContador={setContador} />}
      {nivel === 2 && <JuegoSeba01 contador={contador} setContador={setContador} />}
      {nivel === 3 && <JuegoSeba02 contador={contador} setContador={setContador} />}
      {nivel === 4 && <JuegoFranco contador={contador} setContador={setContador} />}

      {nivel === 5 && (
        <>
          <JuegoFranco2
            contador={contador}
            setContador={setContador}
            onTerminar={() => setNivel5Listo(true)}
          />
          {nivel5Listo && (
            <div className="px-8 py-3">
              <Button
                variant="primary"
                size="lg"
                style={{ width: "200px", height: "60px" }}
                onClick={() => setNivel(6)}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}

      {nivel === 6 && (
        <>
          <ResultadosDiagnostico contador={contador} totalJuegos={5} />
          {guardando && <p className="mt-3">Guardando resultado…</p>}
          {okSave && <p className="mt-3">✅ Resultado guardado en tu perfil.</p>}
          {errorSave && (
            <div className="mt-3">
              <p>❌ {errorSave}</p>
              <Button
                variant="warning"
                onClick={() => {
                  // reintento manual
                  guardadoRef.current = false;
                  setOkSave(false);
                  setErrorSave("");
                  setNivel(6); // re-dispara el useEffect
                }}
              >
                Reintentar guardar
              </Button>
            </div>
          )}
        </>
      )}

      {nivel >= 1 && nivel <= 4 && (
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
      )}
    </div>
  );
}
