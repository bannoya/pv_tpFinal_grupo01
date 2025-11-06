import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AutorizacionProvider } from "./context/AutorizacionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AutorizacionProvider>
          <App />
        </AutorizacionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);