let cadena_car = prompt("Ingrese numeros o ?")
let anterior = 0 
let anterior_ant = 0
let signo
let nueva_cadena = []

for (let index = 0; index < cadena_car.length; index++) {
    
    if (cadena_car[index] != "?") {

        if (signo == "?") {
            signo = parseInt(cadena_car[index]) + anterior_ant
            nueva_cadena[index -1] = signo
        }

        anterior = parseInt(cadena_car[index])
        nueva_cadena[index] = anterior
        
        if (anterior == NaN) {
            anterior = 0
        }


    } else if (cadena_car[index] == "?") {
        anterior_ant = parseInt(anterior)
        signo = cadena_car[index]

        if (anterior_ant == NaN) {
            anterior_ant = 0
        }
        if (index == cadena_car.length - 1) {
            signo = anterior
            nueva_cadena[index] = signo
        }

    }
    


}
alert(nueva_cadena)