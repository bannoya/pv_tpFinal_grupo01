import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../context/ThemeContext.jsx";

function AboutUs() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center vh-100 text-center p-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="w-100">
        <h1 className="fw-bold text-warning mb-4 display-4">Proyecto X</h1>

        <p className="fs-4 mx-auto" style={{ maxWidth: "900px" }}>
          Somos <strong>Proyecto X</strong>, un grupo de estudiantes apasionados
          por el desarrollo de videojuegos. Nuestro equipo está conformado por{" "}
          <strong>Néstor Ezequiel Verón</strong>,{" "}
          <strong>Franco Nicolás Arancibia</strong> y{" "}
          <strong>Juan Sebastián Bach</strong>.
        </p>

        <p className="fs-4 mx-auto" style={{ maxWidth: "900px" }}>
          Cursamos el <strong>primer año</strong> de la{" "}
          <em>Tecnicatura en Desarrollo Integral de Videojuegos</em>, donde
          combinamos creatividad, programación y diseño para dar vida a nuevas
          experiencias interactivas.
        </p>

        <p
          className="fs-4 text-success fw-semibold mx-auto"
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
    </div>
  );
}

export default AboutUs;