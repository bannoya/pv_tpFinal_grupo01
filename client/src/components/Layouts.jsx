import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAutorizacion } from "../hooks/useAutorizacion.js";
import logoPX from "../assets/img/icon_PX.png";


function Layouts() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAutorizacion(); // <- YA lo tenés acá
  const navigate = useNavigate();


  // ❌ NO LLAMES hooks dentro de funciones. Usá el logout ya extraído arriba.
  const manejarLogout = () => {
    const { logout } = useAutorizacion();
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
            <Navbar.Brand
              as={Link}
              to="/home"
              className="fw-bold d-flex align-items-center gap-2"
              style={{ fontSize: "1.8rem" }}
            >
              <img
                src={logoPX}
                alt="Proyecto X Logo"
                style={{
                  height: "48px",
                  width: "auto",
                  filter: darkMode ? "invert(1)" : "none",
                }}
              />
              <span>Proyecto X</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="align-items-center gap-3 ms-auto"
                style={{ fontSize: "1.15rem", fontWeight: "500" }}
              >
                <Nav.Link as={Link} to="/home">🏠 Home</Nav.Link>
                <Nav.Link as={Link} to="/aboutUs">ℹ️ About</Nav.Link>
                {!isAuthenticated && (
                  <Nav.Link as={Link} to="/registrar">📝 Registrar</Nav.Link>
                  
                )}

                {isAuthenticated && role === "ALUMNO" && (
                  <Nav.Link as={Link} to="/games">🎮 Games</Nav.Link>
                )}

                {isAuthenticated && role === "ALUMNO" && (
                  <Nav.Link as={Link} to="/diagnostico">📝 Diagnostico</Nav.Link>
                )}

                {isAuthenticated && role === "ADMINISTRATIVO" && (
                  <NavDropdown title="💼 Proyectos" id="basic-nav-dropdown" align="end">
                    <NavDropdown.Item as={Link} to="/proyecto2">Proyecto 2</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto3">Proyecto 3</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto4">Proyecto 4</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto5">Proyecto 5</NavDropdown.Item>
                  </NavDropdown>)}
                  <Nav.Link as={Link} to="/perfil">👤 Perfil</Nav.Link>
                <button
                  onClick={toggleTheme}
                  className={`btn fw-bold ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                  style={{ fontSize: "1rem" }}
                >
                  {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
                </button>
                {isAuthenticated ? (
                  <div >
                    <span>Hola, {user.name}</span>
                    <Button onClick={logout} style={{ marginLeft: "1rem" }}>
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button variant="primary" className="w-100 mt-3">Iniciar Secion</Button>
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container-fluid p-3">
          <Outlet />
        </div>
      </header>

      <footer
        className={`mt-auto text-center py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"
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