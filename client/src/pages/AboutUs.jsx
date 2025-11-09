// Importamos los estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Importamos el hook del contexto para manejar el tema (modo oscuro / claro)
import { useTheme } from "../context/ThemeContext.jsx";
// Importamos las imágenes de los integrantes del grupo
import eze from "../assets/img/eze.png";
import panda from "../assets/img/panda.jpg";
import bannoya from "../assets/img/bannoya.png";

// Componente principal "AboutUs" que muestra información sobre el equipo del proyecto
function AboutUs() {
  // Extraemos del contexto el valor del modo oscuro
  const { darkMode } = useTheme();

  return (
    // Contenedor principal de la página
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center text-center p-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark" // Cambia colores según el modo
      }`}
    >
      <div className="w-100 mb-5">
        {/* --- Título principal del proyecto --- */}
        <h1 className="fw-bold text-warning mb-5 display-4">Proyecto X</h1>

        {/* --- Sección de tarjetas con la información de cada integrante --- */}
        <div className="row justify-content-center g-4 mb-5">
          {[
            // Datos de cada integrante del equipo
            {
              nombre: "Bach, Juan Sebastian",
              github: "https://github.com/bannoya",
              img: bannoya
            },
            {
              nombre: "Arancibia, Franco Nicolas",
              github: "https://github.com/fatxd",
              img: panda
            },
            {
              nombre: "Verón, Néstor Ezequiel",
              github: "https://github.com/EquiverN",
              img: eze
            },
          ].map((persona, index) => (
            // Generamos una tarjeta para cada integrante
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
              key={index}
            >
              <div className="card h-100 shadow-sm" style={{ fontSize: "0.85rem" }}>
                {/* Imagen del integrante */}
                <img
                  src={persona.img}
                  className="card-img-top"
                  alt={`Imagen de ${persona.nombre}`}
                />
                {/* Contenido de la tarjeta */}
                <div className="card-body p-3">
                  <h5 className="card-title mb-2">{persona.nombre}</h5>
                  <p className="card-text mb-3">
                    Estudiante de Ier año de la carrera "Tecnicatura Universitaria
                    en desarrollo integral de videojuegos".
                  </p>
                  {/* Botón con enlace a su perfil de GitHub */}
                  <a
                    href={persona.github}
                    className="btn btn-dark btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Descripción general del grupo --- */}
        <p className="fs-4 mx-auto mb-4" style={{ maxWidth: "1000px" }}>
          Somos <strong>Proyecto X</strong>, un grupo de estudiantes apasionados
          por el desarrollo de videojuegos. Nuestro equipo está conformado por{" "}
          <strong>Néstor Ezequiel Verón</strong>,{" "}
          <strong>Franco Nicolás Arancibia</strong> y{" "}
          <strong>Juan Sebastián Bach</strong>.
        </p>

        {/* --- Información académica y motivacional --- */}
        <p className="fs-4 mx-auto mb-4" style={{ maxWidth: "1000px" }}>
          Cursamos el <strong>primer año</strong> de la{" "}
          <em>Tecnicatura en Desarrollo Integral de Videojuegos</em>, donde
          combinamos creatividad, programación y diseño para dar vida a nuevas
          experiencias interactivas.
        </p>

        {/* --- Mensaje inspirador --- */}
        <p
          className="fs-4 text-success fw-semibold mx-auto mb-4"
          style={{ maxWidth: "1000px" }}
        >
          Nos une la pasión por crear, aprender y superarnos en cada proyecto.
          Creemos que los videojuegos no solo entretienen, sino que también
          inspiran y conectan a las personas. 🎮
        </p>

        {/* --- Cierre motivacional --- */}
        <p className="mt-4 text-info fst-italic fs-5">
          ¡Seguimos creciendo como equipo y soñando en grande! 🚀
          Abrazo del equipo de <strong>Proyecto X</strong>.
        </p>
      </div>
    </div>
  );
}

// Exportamos el componente para poder usarlo en otras partes del proyecto
export default AboutUs;
