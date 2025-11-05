import { useContext } from "react";
import { AutorizacionContext } from "../context/AutorizacionContext.jsx";

export function useAutorizacion() {
    const context = useContext(AutorizacionContext);
    if (context === null) {
        throw new Error("useAutorizacion debe ser usado dentro de un AutorizacionProvider");
    }
    return context;
}