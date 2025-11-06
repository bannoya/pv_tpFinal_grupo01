alert("Vamos calcular el promedio de 3 numero enteros");

numero1 = Number(prompt("Ingresa el primer numero entero"));
numero2 = Number(prompt("Ingresa el segundo numero entero"));
numero3 = Number(prompt("Ingresa el tercer numero entero"));

function resultado(){
if (Number.isInteger(numero1) && Number.isInteger(numero2) && Number.isInteger(numero3)){
    numero4 = (numero1 + numero2 + numero3)/3; 
    alert("El promedio es " + numero4);
} else {
    alert("Uno o todos de los numeros ingresados no son enteros")
}
};
resultado();
