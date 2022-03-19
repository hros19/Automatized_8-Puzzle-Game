function colaPrio() {
    this.cola = [];
}

colaPrio.prototype.swap = function(nodoDestino, nodoPartida) {
    var nodoTemp = this.cola[nodoDestino];
    this.cola[nodoDestino] = this.cola[nodoPartida];
    this.cola[nodoPartida] = nodoTemp;
    return nodoDestino;
}

colaPrio.prototype.insert = function(num) {
    this.cola.push(num);
    let indiceUltimo = (this.cola.length);
    this.bubbleUp(indiceUltimo - 1);
}

/***
 * Se obtiene el menor (con mayor prioridad) de la cola
 * y se aplica el bubbleDown.
 */
colaPrio.prototype.get = function() {
    let num = this.cola[0];
    console.log("len: ", this.cola.length);
    if (this.cola.length == 0) {
        return -1; // final de la cola
    }
    if (this.cola.length == 1) {
        let num = this.cola[0];
        this.cola.pop();
        return num;
    }
    this.cola[0] = this.cola.pop();
    this.bubbleDown(0);
    return num;
}

colaPrio.prototype.print = function() {
    let i = 0;
    console.log("ini -------------------------");
    while (this.cola[i] !== undefined) {
        console.log(this.cola[i]);
        i++;
    }
    console.log("fin------------------------------");
}

colaPrio.prototype.bubbleUp = function(indice) {
    while (indice > 0) {
        var nodoPadre = Math.floor((indice + 1) / 2) - 1;
        if (this.cola[indice] < this.cola[nodoPadre]) {
            // Si el actual es menor que el nodo padre
            indice = this.swap(nodoPadre, indice);
        } else {
            indice = nodoPadre;
        }
    }
};

colaPrio.prototype.bubbleDown = function(indice) {
    let colaOrdenada = false;
    let nodoHijo;
    let nodoHermano;
    let nodoPendiente;
    while (!colaOrdenada) {
        nodoHijo = (indice + 1) * 2;
        nodoHermano = (nodoHijo - 1);
        nodoPendiente = null; // El que vamos a intercambiar

        if (this.cola[nodoHijo] < this.cola[indice]) {
            // Tenemos que intercambiar al nodoHijo
            nodoPendiente = nodoHijo;
            indice = this.swap(nodoPendiente, indice);
        }
        if (this.cola[nodoHermano] < this.cola[indice] &&
            (this.cola[nodoHijo] == null || (this.cola[nodoHermano] < this.cola[nodoHijo] && this.cola[nodoHijo] !== null))) {
            // Intercambiamos al hermano
            nodoPendiente = nodoHermano;
            indice = this.swap(nodoPendiente, indice);
        }
        // Si no necesitamos hacer cambios
        if (nodoPendiente == null) {
            break;
        }
    }
}

colaPrio.prototype.swap = function(nodoDestino, nodoPartida) {
    var nodoTemp = this.cola[nodoDestino];
    this.cola[nodoDestino] = this.cola[nodoPartida];
    this.cola[nodoPartida] = nodoTemp;
    return nodoDestino;
}

var colaP = new colaPrio();

colaP.insert(5);
colaP.insert(4);
colaP.insert(8);
colaP.insert(6);
colaP.insert(1);
colaP.insert(14);
colaP.insert(2);
colaP.insert(7);

/*
colaP.print();
console.log("Largoo =>>>>>>> ", colaP.cola.length);
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
console.log("\n\n-------------------------");
console.log(colaP.get());
colaP.print();
*/

console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());
console.log(colaP.get());