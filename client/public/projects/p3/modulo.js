export function cargarMatriz() {
    let matriz = []
    for (let i = 0; i < 3; i++) {
        let cadena = document.getElementById("fila" + i).value;
        matriz[i] = [];
        for (let j = 0; j < cadena.length; j++) {
            matriz[i][j] = cadena[j];
        }

    }
    return matriz

}

export function encontrarX(matriz) {
    const filas = 3; 
    const columnas = matriz[0].length;
    let carry = 0;
    let valorX = null; 

    
    for (let j = columnas - 1; j >= 0; j--) {
        let a = matriz[0][j];
        let b = matriz[1][j];
        let c = matriz[2][j];

        
        a = a === "x" ? null : Number(a);
        b = b === "x" ? null : Number(b);
        c = c === "x" ? null : Number(c);

        if (a === null) {
            a = (c - b - carry + 10) % 10;
            matriz[0][j] = a;
            valorX = a;
        } else if (b === null) {
            b = (c - a - carry + 10) % 10;
            matriz[1][j] = b;
            valorX = b;
        } else if (c === null) {
            c = (a + b + carry) % 10;
            matriz[2][j] = c;
            valorX = c;
        }

        
        carry = Math.floor((a + b + carry) / 10);
    }

    return valorX;
}
