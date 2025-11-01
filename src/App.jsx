import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Layouts from "./pages/Layouts.jsx";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import AboutUs from "./pages/AboutUS.jsx";
import Error from "./pages/Error.jsx";
import GameEstrella from "./components/Estrella.jsx";
import {FormularioRegistro} from "./components/Registrar.jsx";
import { JuegoFranco } from "./components/juegoFranco.jsx";
import { JuegoSeba01 } from "./components/juegoSeba01.jsx";
import { JuegoSeba02 } from "./components/juegoSeba02.jsx";
import { JuegoEze } from "./components/juegoEze.jsx"


function App() {
  return (
    <Container fluid className="p-0">
      <Routes>
        <Route path="/" element={<Layouts />}>

          <Route index element={<Home />} />

          <Route path="games" element={<Games />}>
            <Route path="estrella" element={<GameEstrella />} />
          </Route>

          <Route path="aboutUs" element={<AboutUs />} />

          <Route path="*" element={<Error />} />

          <Route path="home" element={<Home />} />
          <Route path="registrar" element={<FormularioRegistro />} />
          <Route path="juegoFranco" element={<JuegoFranco />} />
          <Route path="juegoSeba01" element={<JuegoSeba01/>}/>
           <Route path="juegoSeba02" element={<JuegoSeba02/>}/>
          
          <Route path="juegoEze" element={<JuegoEze/>} />
          
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
