import { cargarMatriz, encontrarX } from "./modulo.js";

function main() {
   
    let matriz = cargarMatriz()
    let valorX = encontrarX(matriz)
    if (valorX !== null) {
        document.getElementById("salida").textContent = "El valor de X es: " + valorX;
    } else {
        document.getElementById("salida").textContent = "No se encontró ninguna X.";
    }
}
document.getElementById("btn-resultado").addEventListener("click", main);

