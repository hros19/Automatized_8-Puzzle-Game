class Juego {
    /**
     * Constructor de la clase Juego.
     * Inicializa un juego de 8-Puzzle recibiendo un tablero (una matriz 3x3)
     * @param {Matriz} tablero 
     */
    constructor(tablero) {
        this.tablero = tablero;
        this.estados = [];
        this.ultimoEstado = null;
    }

    intercambiarPiezas(pza1_x, pza1_y, pza2_x, pza2_y) {
        let piezaTemporal = this.tablero[pza1_x, pza1_y];
        this.tablero[pza1_x, pza1_y] = this.tablero[pza2_x, pza2_y];
        this.tablero[pza2_x, pza2_y] = piezaTemporal;
    }

    getMovimientoPieza(pieza) {
        let pos = this.getPosPiezaBlanca();
        let filaPzaBlanca = pos[0];
        let colPzaBlanca = pos[1];
    }

    juegoTerminado() {
        let cont = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.tablero[i][j] == cont + 1) {
                    break;
                }
                if (cont == 8) {
                    return true;
                }
                cont++;
            }
        }
        return false;
    }


    getPosPiezaBlanca() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tablero[i][j] == 0) {
                    return [i, j];
                }
            }
        }
    }

    //Todo: 
    //Definir que va a ser el objeto estado
    //  Puede ser otra clase con las funciones de g y h
    //Función para calcular los hijos de un estado 
    //Función para calcular cuando ya se llegó al estado objetivo
    


    algoritmoAEstrella() {

        var listaEstados = 0                           //Acá se inicializa la cola de prioridad 
        var camino = []                                //Camino que se debe recorrer para llegar a la solucion

        // estados.push( { puzzle: estado, distancia:0 } ) //Acá se ingresa el primer estado, o puzzle 
                                                       // que es el la matriz que hay que resolver 
                                                       // Notese que la distancia es 0, ya que aún no 
                                                       // se ha movido la pieza vacia. 


        while( estados.size() > 0){                              //Acá empieza el algoritmo, 
            // var estadoActual = listaEstados.pop().puzzle      //Acá devuelve el estado con menor f de la lista de estados 

            if( estadoActual = matrizObjetivo ){ //Reviza si ya llegó a la matriz objetivo 
                return camino
            }

            var hijos = []; //Acá hay que calcular los estados hijos 
                           // osea todos los movimientos posibles del estadoActual
            
            hijos.forEach(hijo => {                                //"Por cada hijo de la lista hijos"
                // var f = calcularG(hijo) + calcularH(hijo)       // Se calcula g y h, acá H puede ser manhattan 
                // listaEstados.push({puzzle: hijo, distancia: f}) //Se ingresan en la lista de estados 
                console.log("hijo");
            })
            

        }



    }



}

let juego = new Juego([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]);

let posiciones = juego.getPosPiezaBlanca();

console.log(juego.juegoTerminado());