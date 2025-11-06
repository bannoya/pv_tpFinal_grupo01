import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

function Layouts() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAutorizacion(); // <- YA lo tenés acá
  const navigate = useNavigate();

  // ❌ NO LLAMES hooks dentro de funciones. Usá el logout ya extraído arriba.
  const manejarLogout = () => {
    logout();
    navigate("/");
  };

  // Si en tu Provider normalizaste a "role", usá "user?.role".
  // Si no, mantené "rol". Te dejo ambas líneas: elegí UNA y borra la otra.
  const role = user?.role ?? user?.rol;

  return (
    <>
      <header style={{ paddingBottom: "1px" }}>
        <Navbar
          expand="lg"
          bg={darkMode ? "dark" : "light"}
          data-bs-theme={darkMode ? "dark" : "light"}
        >
          <Container>
            <Navbar.Brand as={Link} to="/home">
              🏠 Home
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/games">🎮 Games</Nav.Link>
                <Nav.Link as={Link} to="/aboutUs">ℹ️ About</Nav.Link>
                <Nav.Link as={Link} to="/registrar">📝 Registrar</Nav.Link>
                <Nav.Link as={Link} to="/diagnostico">📝 Diagnostico</Nav.Link>

                <NavDropdown title="Opciones" id="basic-nav-dropdown">
                 
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={manejarLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container-fluid p-3">
          <div className="d-flex justify-content-end mb-3">
            <button
              onClick={toggleTheme}
              className={`btn fw-bold ${darkMode ? "btn-light" : "btn-dark"}`}
            >
              {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </div>

          <Outlet />
        </div>
      </header>

      <footer
        className={`mt-auto text-center py-4 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        } border-top`}
      >
        <Container>
          <h5 className="fw-bold mb-3">📞 Contacto</h5>
          <p className="mb-1"><strong>Email:</strong> proyectox@gmail.com</p>
          <p className="mb-3"><strong>Teléfono:</strong> +54 9 11 2345-6789</p>
          <hr className={darkMode ? "border-light" : "border-dark"} />
          <div className="d-flex justify-content-center gap-3 mb-2">
            <Link to="/home" className={darkMode ? "text-light" : "text-dark"}>Inicio</Link>
            <Link to="/games" className={darkMode ? "text-light" : "text-dark"}>Juegos</Link>
            <Link to="/aboutUs" className={darkMode ? "text-light" : "text-dark"}>Sobre nosotros</Link>
            <Link to="/registrar" className={darkMode ? "text-light" : "text-dark"}>Registro</Link>
            <Link to="/diagnostico" className={darkMode ? "text-light" : "text-dark"}>Diagnostico</Link>
          </div>
          <small className="d-block mt-3">
            © {new Date().getFullYear()} Proyecto X — Todos los derechos reservados.
          </small>
        </Container>
      </footer>
    </>
  );
}

export default Layouts;
