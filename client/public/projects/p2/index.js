let numero1 = 0;
let numero2 = 0;

function sumar() {
    const n1 = document.getElementById("primer-numero").value;
    const n2 = document.getElementById("segundo-numero").value;
    let pago;
    if (n1 > 160) {
        pago = n1 * n2;
        pago = pago + (pago * 0.2);
    } else {
        pago = n1 * n2;
    }
    document.getElementById("resultado").textContent = "Tu pago mensual es: $" + pago;
}
document.getElementById("btn-sumar").addEventListener("click", sumar);