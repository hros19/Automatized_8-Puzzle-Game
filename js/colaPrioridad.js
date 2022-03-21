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
     * @param {Array} estado Estado actual del tablero 
     * @param {Integer} peso Peso asignado al estado
     */
    constructor (estado, peso) {
      this.estado = estado;
      this.peso = peso;
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

module.exports = { Nodo, ColaPrioridad };