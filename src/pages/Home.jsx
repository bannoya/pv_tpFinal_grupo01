import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../context/ThemeContext.jsx";

function Home() {
    const { darkMode } = useTheme();

    return (
        <>
            <button
                className="btn btn-success btn-lg"
                style={{ height: "50px", width: "200px", marginTop: "10px" }}
                onClick={() => window.location.href = "/registrar"}
            >
                Registrarse
            </button>

        </>
    )
}

export default Home;