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
        this.contador = 0;
    }

    /**
     * Funcion que pregunta si una fila entra por parametro es igual a la primera fila del tablero
     * del estado actual del juego.
     * @param {Array} pFilaNueva Fila a comparar 
     * @returns True, si la primera fila del tablero actual es exactamente igual
     * a la fila que entra como parametro.
     */
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

    /**
     * Funcion para comparar dos matrices que entran por parametro.
     * @param {Matriz} matriz1 Primera matriz a comparar.
     * @param {Matriz} matriz2 Segunda matriz a comparar.
     * @returns True, si ambas matrices son iguales.
     */
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

    /**
     * Funcion que pregunta si un estado entra por parametro ya existe en la lista de estados.
     * @param {Matriz} estado Un nuevo estado o matriz que entra por parametro y pregunta
     * si es equivalente a alguno de los estados que existen actualmente en memoria. 
     * @returns True, si el estado que entra por parametro ya existe en el camino del juego.
     */
    existeEstado(estado) {
        for (let i in this.camino) {
            if (this.compararMatrices(this.camino[i].estado, estado)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Funcion que convierte una matriz 3x3 en una fila de 9 elementos.
     * @param {Matriz} mat Matriz a convertir en fila 
     * @returns La matriz convertida en fila.
     */ 
    deMatrizAFila(mat) {
        let fila = [];
        for (let i in mat) {
            for (let j in mat[0]) {
                fila.push(mat[i][j]);
            }
        }
        return fila;
    }

    /**
     * Funcion para preguntar si el estado que entra por parametro tiene alguna solucion.
     * @param {Matriz} estado Estado que entra por parametro. 
     * @returns True si el estado tiene solucion. False, caso contrario.
     */
    tieneSolucion(estado) {
        const fila = this.deMatrizAFila(estado);
        let cont = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = i+1; j < 9; j++) {
                if (fila[j] != 0 && fila[i] != 0 && (fila[i] > fila[j])) {
                    cont++;
                }
            }
        }
        return cont % 2 == 0;
    }

    /**
     * @returns Retorna todos los movimientos hechos en un String.
     */
    obtenerMovimientos() {
        let msg = "";
        for (let i = 0; i < this.camino.length - 1; i++) {
            let nodoActual = this.camino[i];
            let posBlancaActual = nodoActual.obtenerPosPiezaBlanca();

            let nodoSiguiente = this.camino[i+1];
            let posBlancaSig = nodoSiguiente.obtenerPosPiezaBlanca();

            // Si hubo regreso
            if (posBlancaActual[0] != posBlancaSig[0] && posBlancaActual[1] != posBlancaSig[1]) {
                msg += "~";
            }
            // Movimientos horizontales
            // Movimiento derecho
            if (posBlancaActual[0] == posBlancaSig[0] && posBlancaActual[1] < posBlancaSig[1]) {
                let valorMovido = nodoActual.estado[posBlancaSig[0]][posBlancaSig[1]]
                msg += "(r; " + valorMovido + ")";
            }
            // Movimiento izquierdo
            if (posBlancaActual[0] == posBlancaSig[0] && posBlancaActual[1] > posBlancaSig[1]) {
                let valorMovido = nodoActual.estado[posBlancaSig[0]][posBlancaSig[1]]
                msg += "(l; " + valorMovido + ")";
            }

            // Movimientos verticales
            // Movimiento arriba
            if (posBlancaActual[1] == posBlancaSig[1] && posBlancaActual[0] < posBlancaSig[0]) {
                let valorMovido = nodoActual.estado[posBlancaSig[0]][posBlancaSig[1]]
                msg += "(u; " + valorMovido + ")";
            }
            if (posBlancaActual[1] == posBlancaSig[1] && posBlancaActual[0] > posBlancaSig[0]) {
                let valorMovido = nodoActual.estado[posBlancaSig[0]][posBlancaSig[1]]
                msg += "(d; " + valorMovido + ")";
            }
        }
        return msg;
    }

    /**
     * Funcion que pregunta si el tablero actual es valido.
     * @returns True, si el estado actual del juego se considera un estado valido.
     * Teniendo como estado valido a una matriz que tiene los elementos con los valores
     * del 0-8 (Inclusivo) y sin repeticion de ningun elemento.]
     */
    esTableroValido() {
        let res = [0,1,2,3,4,5,6,7,8];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let n = this.tablero[i][j];
                let index = res.indexOf(n);
                if (index > -1) {
                    res.splice(index, 1);
                }
            }
        }
        return res.length == 0;
    }

    /**
     * Implementacion del Backtracking para encontrar una solucion al juego.
     * @returns El camino del juego con el que dio con la solucion.
     */
    algoritmoAEstrella() {
        this.camino = [];
        let listaEstados = new ColaPrioridad();                          
        let n = new Nodo(this.tablero, 0);
        n.peso = n.calcularManhattan();
        this.camino.push(n);
        let raiz = n;
        do {
            let hijos = n.obtenerHijos();
            for (let i in hijos) {
                if (!this.tieneSolucion(hijos[i].estado)) {
                    this.camino.push(hijos[i]);
                    continue;
                }
                if (hijos[i].esSolucion()) {
                    hijos[i].peso = hijos[i].calcularManhattan() + this.camino.length + 1
                    this.camino.push(hijos[i]);
                    return this.camino;
                }
                if (!this.existeEstado(hijos[i].estado) && 
                    ((this.primeraFilaIgual([1,2,3]) && this.primeraFilaIgual(hijos[i].estado[0])))) {
                    listaEstados.insertar(hijos[i]);
                }
                if (!this.existeEstado(hijos[i].estado)) {
                    listaEstados.insertar(hijos[i]);
                }
            }
            let hijoElegido = listaEstados.pop();
            if (hijoElegido == null) {
                n = raiz;
                continue;
            } else {
                hijoElegido.peso = hijoElegido.calcularManhattan() + this.camino.length;
                this.camino.push(hijoElegido);
                n = hijoElegido;
            }
        } while (true);
    }

    /**
     * Implementacion del algoritmo backtracking para dar con la solucion del juego. Teniendo como restriccion una
     * cierta cantidad de repeticiones ya que puede crashear el programa.
     * @returns El camino del juego con el que dio con la solucion.
     */
    algoritmoBacktracking() {
        this.contador = 0;
        this.camino = [];
        let estadosActuales = [];
        let nodo = new Nodo(this.tablero, 0);
        this.camino.push(nodo);
        do {
            this.contador++;
            if(this.contador > 10000){
                return "Demasiadas recursiones"
            }
            let hijos = nodo.obtenerHijos();
            for (let i in hijos) {
                if (hijos[i].esSolucion()) {
                    this.camino.push(hijos[i]);
                    return this.camino;
                }
                if (!this.existeEstado(hijos[i].estado)) {
                    this.camino.push(hijos[i]);
                    estadosActuales.push(hijos[i]);
                }
            }
            let nuevo = estadosActuales.shift();
            if (nuevo == undefined) {
                return null;
            } else {
                nodo = nuevo;
            }
        } while (true);
    }
}

