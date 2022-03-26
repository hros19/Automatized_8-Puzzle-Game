//const { Nodo, ColaPrioridad } = require('./colaPrioridad.js');

const matrizSolucion = [[1,2,3],[4,5,6],[7,8,0]];

class Juego {
    /**
     * Constructor de la clase Juego.
     * Inicializa un juego de 8-Puzzle recibiendo un tablero (una matriz 3x3)
     * @param {Matriz} tablero 
     */
    constructor(tablero) {
        this.tablero = tablero;
        this.camino = [];
        this.ultimoEstado = null;
    }

    primeraFilaIgual(pFilaNueva) {
        let filaActual = this.tablero[0];
        if (filaActual.length != pFilaNueva.length) {
            return false;
        }
        
        for (let i in filaActual) {
            if (filaActual[i] != pFilaNueva[i]) {
                return false;
            }
        }
        return true;
    }

    compararMatrices(matriz1, matriz2) {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (matriz1[i][j] != matriz2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    existeEstado(estado) {
        for (let i in this.camino) {
            if (this.compararMatrices(this.camino[i].estado, estado)) {
                return true;
            }
        }
        return false;
    } 

    algoritmoAEstrella() {
        let listaEstados = new ColaPrioridad();                           //Acá se inicializa la cola de prioridad                             //Camino que se debe recorrer para llegar a la solucion
        let n = new Nodo(this.tablero, 0);
        n.peso = n.calcularManhattan();
        //console.log("P: ", n.calcularManhattan());
        //return;
        this.camino.push(n);
        let raiz = n;
        let cont = 0;
        do {
            cont++;
            let hijos = n.obtenerHijos();
            //console.log("~~~~~~~~~~~~~~~");
            //console.log("NA: ", n.estado);
            for (let i in hijos) {
                if (hijos[i].esSolucion()) {
                    hijos[i].peso = hijos[i].calcularManhattan() + this.camino.length + 1
                    this.camino.push(hijos[i]);
                    console.log(cont);
                    return this.camino;
                }
                //console.log("HA: ", hijos[i].estado, !this.existeEstado(hijos[i].estado),
                //this.primeraFilaIgual([1,2,3]), this.primeraFilaIgual(hijos[i].estado[0]));
                if (!this.existeEstado(hijos[i].estado) && 
                    ((this.primeraFilaIgual([1,2,3]) && this.primeraFilaIgual(hijos[i].estado[0])))) {
                    listaEstados.insertar(hijos[i]);
                }
                if (!this.existeEstado(hijos[i].estado)) {
                    listaEstados.insertar(hijos[i]);
                }
            }
            let hijoElegido = listaEstados.pop();
            //console.log(">>>> ", hijoElegido);
            if (hijoElegido == null) {
                //console.log("final rama");
                n = raiz;
                continue;
            } else {
                hijoElegido.peso = hijoElegido.calcularManhattan() + this.camino.length;
                this.camino.push(hijoElegido);
                n = hijoElegido;
            }
        } while (true);
    }
}




// let juego1 = new Juego([
//     [1, 2, 3],
//     [0, 4, 6],
//     [7, 5, 8]
// ]);

//let res1 = juego1.algoritmoAEstrella();

// let juego2 = new Juego([
//     [6, 8, 0],
//     [2, 1, 3],
//     [7, 4, 5]
// ]);
// //console.log(juego2.compararMatrices([[1,2,3],[4,5,6],[7,8,0]], [[1,2,3],[4,5,6],[7,8,9]]))

// let res2 = juego2.algoritmoAEstrella();

// for(let i in res2) {
//     res2[i].mostrar();
// }//*/

// module.exports = {Juego}