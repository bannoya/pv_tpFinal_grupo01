function calcularMayor(numero1, numero2) {
    if (numero1 > numero2) {
        alert("El numero mayor es: " + numero1)
    } else if (numero2 > numero1) {
        alert("El numero mayor es: " + numero2)
    } else {
        alert("Los numeros son iguales")
    }

}

function main() {
    let numero1 = prompt("Ingrese el primer numero")
    let numero2 = prompt("Ingrese el segundo numero")

    calcularMayor(numero1, numero2)

}

main()