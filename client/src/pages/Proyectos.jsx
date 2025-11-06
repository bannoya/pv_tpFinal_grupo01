import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../context/ThemeContext.jsx";
import insetar from "../assets/img/insertar.png";

function Proyectos() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center text-center p-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
    >
      <div className="w-100 mb-5">
        <h1 className="fw-bold text-warning mb-4 display-4">Proyecto X</h1>

        <p className="fs-4 mx-auto mb-4" style={{ maxWidth: "900px" }}>
          Somos <strong>Proyecto X</strong>, un grupo de estudiantes apasionados
          por el desarrollo de videojuegos. Nuestro equipo está conformado por{" "}
          <strong>Néstor Ezequiel Verón</strong>,{" "}
          <strong>Franco Nicolás Arancibia</strong> y{" "}
          <strong>Juan Sebastián Bach</strong>.
        </p>

        <p className="fs-4 mx-auto mb-4" style={{ maxWidth: "900px" }}>
          Cursamos el <strong>primer año</strong> de la{" "}
          <em>Tecnicatura en Desarrollo Integral de Videojuegos</em>, donde
          combinamos creatividad, programación y diseño para dar vida a nuevas
          experiencias interactivas.
        </p>

        <p
          className="fs-4 text-success fw-semibold mx-auto mb-4"
          style={{ maxWidth: "900px" }}
        >
          Nos une la pasión por crear, aprender y superarnos en cada proyecto.
          Creemos que los videojuegos no solo entretienen, sino que también
          inspiran y conectan a las personas. 🎮
        </p>

        <p className="mt-4 text-info fst-italic fs-5">
          ¡Seguimos creciendo como equipo y soñando en grande! 🚀
          Abrazo del equipo de <strong>Proyecto X</strong>.
        </p>
      </div>

      <div className="row justify-content-center g-2">
        {[
          {
            nombre: "Bach, Juan Sebastian",
            github: "https://github.com/bannoya"
          },
          {
            nombre: "Arancibia, Franco Nicolas",
            github: "https://github.com/fatxd"
          },
          {
            nombre: "Verón, Néstor Ezequiel",
            github: "https://github.com/EquiverN"
          }
        ].map((persona, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
            <div className="card h-100" style={{ fontSize: "0.8rem" }}>
              <img src={insetar} className="card-img-top" alt={`Imagen de ${persona.nombre}`} />
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{persona.nombre}</h6>
                <p className="card-text mb-2">
                  Estudiante de Ier año de la carrera "Tecnicatura Universitaria en desarrollo integral de videojuegos".
                </p>
                <a href={persona.github} className="btn btn-dark btn-sm" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proyectos;