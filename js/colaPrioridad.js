class Nodo {
    constructor (estado, peso) {
      this.estado = estado;
      this.peso = peso;
    }
  }
  
  class ColaPrioridad {
    constructor () {
      this.elementos = [];
    }
  
    estaVacia() {
      return this.elementos.length === 0;
    }
  
    print() {
      console.log("Total: " + this.elementos.length);
      for (let i in this.elementos) {
        console.log("E: " + this.elementos[i].peso);
      }
    }
  
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
      return this.size;
    }
  
    pop() {
      if (this.estaVacia()) { return null; }
      return this.elementos.pop();
    }
  }