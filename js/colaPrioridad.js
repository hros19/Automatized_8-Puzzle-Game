/**
 * Clase Nodo.
 * Principal elemento para almacenar cada estado del juego
 * y su respectivo peso.
 */
class Nodo {
    /**
     * Cosntructor Principal.
     * Recibe por parametro un estado (una matriz) que indica el estado
     * del tablero y su respectivo peso.
     * @param {Matriz} estado Estado actual del tablero 
     * @param {Integer} peso Peso asignado al estado
     */
    constructor (estado, peso) {
      this.estado = estado;
      this.peso = peso;
    }

    /**
     * Obtiene la posicion de la pieza blanco (que contiene el 0)
     * @returns Un array con las posiciones de la pieza blanca (fila, col)
     */
     obtenerPosPiezaBlanca() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.estado[i][j] == 0) {
                    return [i, j];
                }
            }
        }
    }

    /**
     * Pregunta si el estado actual es igual al estado que entra por
     * parametro en la funcion,
     * @param {Matriz} estado Matriz que entra por parametro 
     * @returns 
     */
    estadosIguales(estado) {
        for (let i in this.estado) {
            for (let j in this.estado[0]) {
                if ((this.estado)[i][j] != estado[i][j]) {
                    return false;
                } 
            }
        }
        return true;
    }

    /**
     * Calcula y setea el peso del nodo actual con la distancia de manhattan y una altura pasada por parametro
     * @param {Integer} altura actual del nodo en el proceso de solucion del juego.
     */
    calcularPeso(altura) {
        this.peso = altura + this.calcularManhattan();
    }

    /**
     * Pregunta si el estado actual del nodo es la solucion.
     * @returns True, si es la solucion. False, caso contrario.
     */
    esSolucion() {
        let cont = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (cont == 8) {
                    return true;
                }
                if (this.estado[i][j] != cont + 1) {
                    return false;
                }
                cont++;
            }
        }
        return false;
    }

    /**
     * Intercambia dos piezas dadas sus coordenadas.
     * @param {*} pza1_x Coordenada en x de pieza 1
     * @param {*} pza1_y Coordenada en y de pieza 1
     * @param {*} pza2_x Coordenada en x de pieza 2
     * @param {*} pza2_y Coordenada en y de pieza 2
     */
    intercambiarPiezas(pza1_x, pza1_y, pza2_x, pza2_y) {
        let piezaTemporal = this.estado[pza1_x][pza1_y];
        this.estado[pza1_x][pza1_y] = this.estado[pza2_x][pza2_y];
        this.estado[pza2_x][pza2_y] = piezaTemporal;
    }

    /**
     * Obtener la columna destino de una pieza (dado su valor numerico)
     * @param {Integer} valorPieza valor numerico de la pieza
     * @returns La columna en donde deberia estar
     */
    obtenerColumnaDestino(valorPieza) {
        if ([1, 4, 7].includes(valorPieza)) return 0;
        if ([2, 5, 8].includes(valorPieza)) return 1;
        return 2; 
    }

    /**
     * Obtener la fila destino de una pieza (dado su valor numerico)
     * @param {Integer} valorPieza Valor numerico de la pieza
     * @returns La fila en donde deberia estar la pieza
     */
    obtenerFilaDestino(valorPieza) {
        if ([1, 2, 3].includes(valorPieza)) return 0;
        if ([4, 5, 6].includes(valorPieza)) return 1;
        return 2;
    }

    /**
     * Obtenemos la coordenada completa en donde deberia estar una pieza
     * @param {Integer} valorPieza el valor numerico de la pieza
     * @returns Un arreglo con las posiciones (fila, columna) en donde deberia ir la pieza
     * pasada por parametro.
     */
    obtenerPosDestino(valorPieza) {
        return [this.obtenerFilaDestino(valorPieza), this.obtenerColumnaDestino(valorPieza)];
    }

    /**
     * Obtenemos el valor actual de una pieza dado su valor numerico
     * @param {*} valorPieza El valor numerico de la pieza a buscar
     * @returns Un array (fila, columna) de la posicion de la pieza con el valor
     * numerico especificado por parametro.
     */
    obtenerPosPieza(valorPieza) {
        for(let i in this.estado) {
            for(let j in this.estado[0]) {
                if (this.estado[i][j] == valorPieza) {
                    return [Number(i), Number(j)];
                }
            }
        }
    }
    
    /**
     * Movemos una pieza en especifico si es que se puede mover.
     * @param {Integer} pieza Valor numerico de la pieza que queremos mover.
     */
    mover(pieza) {
        let posPiezaActual = this.obtenerPosPieza(pieza);
        let posPiezaBlanca = this.obtenerPosPiezaBlanca();
        if (this.obtenerPiezasMovibles().includes(pieza)) {
            this.intercambiarPiezas(posPiezaActual[0], posPiezaActual[1], posPiezaBlanca[0], posPiezaBlanca[1]);
        }
    }

    /**
     * Genera una copia exacta del tablero.
     * @returns Una copia exacta del tablero, como una matriz
     */
    obtenerCopiaTablero() {
        let res = [[0,0,0],[0,0,0],[0,0,0]];
        for (let i in this.estado) {
            for (let j in this.estado[0]) {
                res[i][j] = this.estado[i][j];
            }
        }
        return res;
    }

    /**
     * Consulta el estado de resolucion de la primera fila del tablero.
     * @returns True, si la primera fila esta resulesta. False, caso contrario.
     */
    primeraFilaResuelta() {
        for (let i in this.estado) {
            if (this.estado[0][i] != Number(i) + 1) {
                return false;
            }
        }
        return true;
    }

    /**
     * Funcion para retornar los hijos del tablero.
     * @returns Un array con los nodos hijos del estado actual.
     */
    obtenerHijos() {
        let hijos = [];
        let piezasMovibles = this.obtenerPiezasMovibles();
        for (let i in piezasMovibles) {
            let posPiezaActual = this.obtenerPosPieza(piezasMovibles[i]);
            let posPiezaBlanca = this.obtenerPosPiezaBlanca();
            let nuevoHijo = new Nodo(this.obtenerCopiaTablero(), 0);
            nuevoHijo.intercambiarPiezas(posPiezaActual[0], posPiezaActual[1], posPiezaBlanca[0], posPiezaBlanca[1]);
            nuevoHijo.peso = nuevoHijo.calcularManhattan();
            hijos.push(nuevoHijo);
        }
        return hijos;
    }
  
    // Funcion que imprimir el estado actual de una forma agradable en forma de tablero.
    mostrar() {
        let msg = "";
        for (let i in this.estado) {
            for (let j in this.estado[0]) {
                msg += this.estado[i][j] + "\t";
            }
            msg += "\n";
        }
        console.log(msg);
    }
    
    /**
     * Obtiene todas las piezas que se pueden mover en el estado actual.
     * @returns Un array con todas las piezas (valores numericos) los cuales pueden moverse teniendo
     * como criterio que se encuentren pegados a la pieza blanca.
     */
    obtenerPiezasMovibles() {
        // Buscamos las piezas que están alrededor de 0.
        let posPzaBlanca = this.obtenerPosPiezaBlanca();
        let filaPzaB = posPzaBlanca[0];
        let colPzaB = posPzaBlanca[1];
        //Pieza blanca en el mero centro
        if (filaPzaB == 1 && colPzaB == 1) {
            return [this.estado[0][1], this.estado[1][0], this.estado[1][2], this.estado[2][1]];
        }
        //Pieza blanca esquinera
        if (filaPzaB == 0 && colPzaB == 0) {
            return [this.estado[0][1], this.estado[1][0]];
        }
        if (filaPzaB == 0 && colPzaB == 2) {
            return [this.estado[0][1], this.estado[1][2]];
        }
        if (filaPzaB == 2 && colPzaB == 0) {
            return [this.estado[2][1], this.estado[1][0]];
        }
        if (filaPzaB == 2 && colPzaB == 2) {
            return [this.estado[2][1], this.estado[1][2]];
        }
        //Pieza blanca como arista
        if (filaPzaB == 0 && colPzaB == 1) {
            return [this.estado[0][0], this.estado[0][2], this.estado[1][1]];
        }
        if (filaPzaB == 1 && colPzaB == 0) {
            return [this.estado[0][0], this.estado[2][0], this.estado[1][1]];
        }
        if (filaPzaB == 1 && colPzaB == 2) {
            return [this.estado[0][2], this.estado[2][2], this.estado[1][1]];
        }
        if (filaPzaB == 2 && colPzaB == 1) {
            return [this.estado[2][0], this.estado[2][2], this.estado[1][1]];
        }
        return ["ERROR INDEXADO obtenerPiezasMovibles()"];
    }
    
    /**
     * Calcula la distancia manhattan.
     * @returns Un valor numerico entero con la distancia manhattan de las piezas
     * del estado actual.
     */
    calcularManhattan() {
        var distancia = 0;
        for(let i in this.estado) {
            for (let j in this.estado[0]) {
                if (this.estado[i][j] != 0) {
                    i = Number(i);
                    j = Number(j);
                    let posicionesOriginales = this.obtenerPosDestino(this.estado[i][j]);
                    distancia += Math.abs(i - posicionesOriginales[0]) + Math.abs(j - posicionesOriginales[1]);
                }
            }
        }
        return distancia;
    }
  }

/**
 * Clase ColaPrioridad.
 * Estructura principal para manejar los estados del tablero y sus pesos asociados.
 */
 class ColaPrioridad {
    constructor () {
      this.elementos = [];
    }
    
    //Retorna un booleano indicando si la estructura está vacía
    estaVacia() {
        return this.elementos.length === 0;
    }
    
    //Pendiente a borrar, no es requerido
    print() {
        console.log("Total: " + this.elementos.length);
        for (let i in this.elementos) {
            console.log("E: " + this.elementos[i].peso);
        }
    }

    /**
     * Recibe un Nodo y lo inserta en la cola de Prioridad.
     * @param {Nodo} nodo Nodo a insertar. 
     */
    insertar(nodo) {
        if (this.estaVacia() || nodo.peso <= this.elementos[this.elementos.length - 1].peso) {
            this.elementos.push(nodo);
        } else {
            for (let i in this.elementos) {
                if (nodo.peso > this.elementos[i].peso) {
                    this.elementos.splice(i, 0, nodo);
                    break;
                }
            }
        }
    }
  
    /**
     * @returns El Nodo con menor peso de la cola de prioridad.
     */
    pop() {
        if (this.estaVacia()) { return null; }
        return this.elementos.pop();
    }
}

//module.exports = { Nodo, ColaPrioridad };