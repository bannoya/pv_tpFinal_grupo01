import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts.jsx";
import { ProtectorRutas } from "./components/ProtectorRutas.jsx";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import AboutUs from "./pages/AboutUS.jsx";
import Error from "./pages/Error.jsx";
import GameEstrella from "./components/Estrella.jsx";
import { FormularioRegistro } from "./components/Registrar.jsx";
import { JuegoFranco } from "./components/juegoFranco.jsx";
import { JuegoSeba01 } from "./components/juegoSeba01.jsx";
import { JuegoSeba02 } from "./components/juegoSeba02.jsx";
import { JuegoEze } from "./components/juegoEze.jsx"
import { Diagonostico } from "./pages/Diagnostico.jsx";
import { JuegoFranco2 } from "./components/JuegoFranco2.jsx";
import { ResultadosDiagnostico } from "./components/ResultadosDiagnostico.jsx";
import Project4 from "./components/Project4.jsx";
import Project5 from "./components/Project5.jsx";
import Project3 from "./components/Project3.jsx";
import Project2 from "./components/Project2.jsx";
import { Login } from "./components/Login.jsx";
import Perfil from "./pages/Perfil.jsx";

function App() {
  return (
    <Container fluid className="p-0">
      <Routes>
        <Route path="/" element={<Layouts />}>

          <Route index element={<Home />} />

          <Route path="games" element={
            <ProtectorRutas allowedRoles={["ALUMNO"]} >
              <Games />
            </ProtectorRutas>}>
            <Route path="estrella" element={
              <ProtectorRutas allowedRoles={["ALUMNO"]}>
                <GameEstrella />
              </ProtectorRutas>} />
          </Route>

          <Route path="aboutUs" element={<AboutUs />} />

          <Route path="*" element={<Error />} />

          <Route path="home" element={<Home />} />
          <Route path="registrar" element={<FormularioRegistro />} />
          <Route path="diagnostico" element={<Diagonostico />} />
          <Route path="login" element={<Login />} />
          <Route path="juegoFranco" element={<JuegoFranco />} />
          <Route path="juegoFranco2" element={<JuegoFranco2 />} />
          <Route path="juegoSeba01" element={<JuegoSeba01 />} />
          <Route path="juegoSeba02" element={<JuegoSeba02 />} />
          <Route path="juegoEze" element={<JuegoEze />} />

          <Route path="resultadoDiagnostico" element={<ResultadosDiagnostico />} />
         
          <Route path="/proyecto2" element={
            <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]} >
              <Project2 />
            </ProtectorRutas>
          } />
          <Route path="/proyecto3" element={
            <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]} >
              <Project3 />
            </ProtectorRutas>
          } />
          <Route path="/proyecto4" element={
            <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]} >
              <Project4 />
            </ProtectorRutas>
          } />
          <Route path="/proyecto5" element={
            <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]} >
              <Project5 />
            </ProtectorRutas>
          } />

          <Route path="/perfil" element={
            <ProtectorRutas allowedRoles={["ALUMNO", "ADMINISTRATIVO"]} >
            <Perfil />
            </ProtectorRutas>
            } />
        </Route>

      </Routes>
    </Container>
  );
}

export default App;