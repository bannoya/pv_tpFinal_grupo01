
let listaMascotas = [];

export function agregarMascota(mascota, contMascota) {
    listaMascotas.push(mascota);
    return contMascota += 1
}

export function mostrarMascotas(tabla, contMascota) {
    tabla.innerHTML = "";

    listaMascotas.forEach(mascota => {
        let fila = `
      <tr data-id="${mascota.id}">
        <td>${mascota.nombre}</td>
        <td>${"Raza: " + mascota.tipo}</td>
        <td>${"Edad: " + mascota.edad}</td>
        <td>${"Nombre del dueño: " + mascota.nombreDueno}</td>
        <td>${"Vacunado: " + mascota.vacuna}</td>
        <td><button data-action="borrar">Eliminar</button></td>
      </tr>
    `;
        tabla.innerHTML += fila;
    });

}

export function borrarMascota(id, contMascota) {
    listaMascotas = listaMascotas.filter(mascota => mascota.id !== id);
    return contMascota -= 1
}

 