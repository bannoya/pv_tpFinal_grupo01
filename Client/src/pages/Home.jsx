import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../context/ThemeContext.jsx";
import { Container, Row,Col } from "react-bootstrap";
import { Login } from "../components/Login.jsx";

function Home() {
    const { darkMode } = useTheme();

   return (
  <>
    <Container
      fluid
      className={`d-flex flex-column justify-content-center align-items-center ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <button
            className="btn btn-success btn-lg"
            style={{ height: "50px", width: "200px", marginTop: "10px" }}
            onClick={() => (window.location.href = "/registrar")}
          >
            Registrarse
          </button>
        </Col>

        <Col sm="auto" style={{ minWidth: "400px" }}>
          <Login />
        </Col>
      </Row>
    </Container>
  </>
);

}

export default Home;