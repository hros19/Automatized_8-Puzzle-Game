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



}

let juego = new Juego([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]);

let posiciones = juego.getPosPiezaBlanca();

console.log(juego.juegoTerminado());