import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { JuegoEze } from "../components/juegoEze.jsx";
import { JuegoSeba01 } from "../components/juegoSeba01.jsx";
import { JuegoSeba02 } from "../components/juegoSeba02.jsx";
import { JuegoFranco } from "../components/juegoFranco.jsx";
import { JuegoFranco2 } from "../components/JuegoFranco2.jsx";
import { ResultadosDiagnostico } from "../components/ResultadosDiagnostico.jsx";

export function Diagonostico() {
  const [nivel, setNivel] = useState(1);
  const [contador, setContador] = useState(0);

  
  const [nivel5Listo, setNivel5Listo] = useState(false);

  const irNivel = () => setNivel((n) => Math.min(n + 1, 6)); 

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
        <ResultadosDiagnostico
          contador={contador}
          totalJuegos={5}
        
        />
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
