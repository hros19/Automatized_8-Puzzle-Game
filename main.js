matrizObjetivo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 'X']
]

matrizPrueba = [
    [1, 2, 3],
    ['X', 4, 6],
    [7, 5, 8]
]


//f = g + h
// g = El costo de moverse que es igual a 1
// h = El numero de casillas desordenadas 

//        [1, 2, 3]
//        [0, 4, 6]
//        [7, 5, 8]
//      h = 4


nodoJuego = {
    h: 0,
    g: 0,
    matriz: []
}



calcular_g = (matriz_nodo) => {

    console.log('calcular')

}

console.log(matrizPrueba)