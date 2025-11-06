function mostrar(event) {

    event.preventDefault();

    let Nombre = document.getElementById("Nombre").value;
    let Apellido = document.getElementById("Apellido").value;
    let Libreta = document.getElementById("Libreta").value;

    alert("Los datos ingresados son:  \nNombre: " + Nombre +
        "\nApellido: " + Apellido +
        "\nLibreta Universitaria: " + Libreta)
}

document.getElementById("miFormulario").addEventListener("submit", mostrar)


