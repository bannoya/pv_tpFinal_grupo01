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
          
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
