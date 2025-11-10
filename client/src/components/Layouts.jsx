import { Outlet, Link} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext.jsx"; // 🎨 Contexto para manejar tema oscuro/claro
import { useAutorizacion } from "../hooks/useAutorizacion.js"; // 🔐 Hook personalizado de autenticación
import logoPX from "../assets/img/icon_PX.png"; // 🖼️ Logo del proyecto

// 📦 Componente principal de layout (estructura general de la app)
function Layouts() {
  // Extrae estado y función para manejar el modo oscuro/claro desde el contexto
  const { darkMode, toggleTheme } = useTheme();

  // Extrae información del usuario y funciones de autenticación
  const { user, isAuthenticated, logout } = useAutorizacion();
  

  // 🔍 Determina el rol del usuario. Usa `role` o `rol` según cómo esté definido en tu backend.
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
            {/* LOGO + TÍTULO DEL PROYECTO */}
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
                  filter: darkMode ? "invert(1)" : "none", // Invertir color en modo oscuro
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

                {/* Enlace visible sólo si NO está autenticado */}
                {!isAuthenticated && (
                  <Nav.Link as={Link} to="/registrar">📝 Registrar</Nav.Link>
                )}

                {/* Menú para usuarios con rol de ALUMNO */}
                {isAuthenticated && role === "ALUMNO" && (
                  <>
                    <Nav.Link as={Link} to="/games">🎮 Games</Nav.Link>
                    <Nav.Link as={Link} to="/diagnostico">📝 Diagnostico</Nav.Link>
                  </>
                )}

                

                <NavDropdown title="💼 Proyectos" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/proyecto2">Proyecto 2</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/proyecto3">Proyecto 3</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/proyecto4">Proyecto 4</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/proyecto5">Proyecto 5</NavDropdown.Item>
                </NavDropdown>


                {/* Perfil visible para todos los usuarios autenticados */}
                {isAuthenticated && (
                  <Nav.Link as={Link} to="/perfil">👤 {user.name}</Nav.Link>
                )}

                {/* Botón para cambiar el tema */}
                <button
                  onClick={toggleTheme}
                  className={`btn fw-bold ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                  style={{ fontSize: "1rem" }}
                >
                  {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
                </button>

                
                {isAuthenticated ? (
                  
                  <div>
                    <Button onClick={logout} style={{ marginLeft: "1rem" }}>
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  
                  <Link to="/login">
                    <Button variant="primary" className="w-100 mt-3" style={{ marginBottom: "15px" }}>Iniciar Secion</Button>
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* 📄 CONTENIDO PRINCIPAL de las rutas (Outlet renderiza la vista actual) */}
        <div className="container-fluid p-3">
          <Outlet />
        </div>
      </header>

      {/* 🦶 PIE DE PÁGINA (Footer) */}
      <footer
        className={`mt-auto text-center py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"
          } border-top`}
      >
        <Container>
          {/* Información de contacto */}
          <h5 className="fw-bold mb-3">📞 Contacto</h5>
          <p className="mb-1"><strong>Email:</strong> proyectox@gmail.com</p>
          <p className="mb-3"><strong>Teléfono:</strong> +54 9 11 2345-6789</p>
          <hr className={darkMode ? "border-light" : "border-dark"} />

          {/* Enlaces rápidos del footer */}
          <div className="d-flex justify-content-center gap-3 mb-2">
            <Link to="/home" className={darkMode ? "text-light" : "text-dark"}>Inicio</Link>
            <Link to="/games" className={darkMode ? "text-light" : "text-dark"}>Juegos</Link>
            <Link to="/aboutUs" className={darkMode ? "text-light" : "text-dark"}>Sobre nosotros</Link>
            {!isAuthenticated && (<Link to="/registrar" className={darkMode ? "text-light" : "text-dark"}>Registro</Link>)}
            <Link to="/diagnostico" className={darkMode ? "text-light" : "text-dark"}>Diagnostico</Link>
          </div>

          {/* Derechos reservados dinámicos */}
          <small className="d-block mt-3">
            © {new Date().getFullYear()} Proyecto X — Todos los derechos reservados.
          </small>
        </Container>
      </footer>
    </>
  );
}

export default Layouts;
