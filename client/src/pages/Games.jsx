import { Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Games() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 p-5
      ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)"
          : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        transition: "all 0.4s ease-in-out",
      }}
    >
      <h1 className="fw-bold mb-5 display-5 text-center">
        🎮 Juegos Educativos
      </h1>

      <Card
        className={`shadow-lg border-0 text-center p-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"
          }`}
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "1.5rem",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Card.Header
          className={`fs-5 fw-semibold ${darkMode ? "bg-dark text-light" : "bg-primary text-white"
            }`}
          style={{ borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}
        >
          Juego #1
        </Card.Header>

        <Card.Body className="px-4 py-5">
          <Card.Title className="fs-2 fw-bold mb-3">
            ⭐ Atrapa las Estrellas
          </Card.Title>
          <Card.Text className="fs-5 mb-4">
            Ayuda a un pequeño personaje a atrapar las estrellas antes de que
            desaparezcan del cielo. ¡Rápido, divertido y educativo!
          </Card.Text>

          <Link to="estrella">
            <Button
              variant={darkMode ? "light" : "primary"}
              size="lg"
              className="px-5 py-2 fw-semibold"
              style={{
                borderRadius: "1rem",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Ir al juego 🚀
            </Button>
          </Link>
          <Outlet />
        </Card.Body>
      </Card>
      <button
        className="btn btn-success btn-lg"
        style={{ height: "50px", width: "200px", marginTop: "10px" }}
        onClick={() => window.location.href = "/juegoFranco"}
      >
        juegoFranco
      </button>
    </div>
  );
}