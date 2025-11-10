
import { agregarMascota, mostrarMascotas, borrarMascota } from "./modulo02.js";

const formulario = document.getElementById("formulario");
const tabla = document.querySelector("#tabla-mascotas tbody");
let contMascota = 0
let contSi = 0
let contNo = 0

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  let nombre = document.getElementById("nombre-mascota").value;
  let tipo = document.getElementById("opciones").value;
  let edad = document.getElementById("edad").value;
  let nombreDueno = document.getElementById("nombre-dueno").value;
  let vacunaSelect = document.querySelector('input[name="vacunado"]:checked');
  let vacuna = vacunaSelect ? vacunaSelect.value : "No seleccionado";

  const mascota = { id: Date.now(), nombre, tipo, edad, nombreDueno, vacuna };
  contMascota = agregarMascota(mascota, contMascota);
  mostrarMascotas(tabla);


  formulario.reset();

  if (vacuna == "si") {
    contSi += 1
  } else if (vacuna == "no") {
    contNo += 1
  } else {
    contNo += 0
    contSi += 0
  }
  actualizarContador();

});

tabla.addEventListener("click", function (e) {
  if (e.target.dataset.action === "borrar") {
    let fila = e.target.closest("tr");
    let id = parseInt(fila.dataset.id);
    let estadoVacuna = fila.cells[4].textContent.replace("Vacunado: ", "").trim();
    if (estadoVacuna === "si") {
      contSi -= 1;
    } else if (estadoVacuna === "no") {
      contNo -= 1;
    }
    contMascota = borrarMascota(id, contMascota);
    mostrarMascotas(tabla);
    actualizarContador();
  }

});


function actualizarContador() {
  document.getElementById("total-mascotas").textContent = contMascota;
  document.getElementById("vacunadas").textContent = contSi;
  document.getElementById("no-vacunadas").textContent = contNo;
}

