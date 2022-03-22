/* 
A* trabaja de forma similar que BFS con las sig diferencias
  - en lugar de una cola, se una cola de prioridad
    (En lugar de retornar el primer elemento que se agregó
    retorna el elemento con un valor menor)
  - para cada nuevo estado, se le asigna un valor definido como f(n) = g(n) + h(n)

Siendo g(n) la funcion de coste real. Es el coste necesario para ir desde el inicio hasta el estado n.

h(n) la funcion heuristica. Estima el costo para ir desde el estado (n) hasta el estado de solucion.


*/

let estados = [];

estados.push([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]);
estados.push([
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 8]
]);

let i = estados.length - 1;
while (i >= 0) {
    console.log(estados[i]);
    i--;
}



// document.addEventListener("DOMContentLoaded", () => {
//     generarTablero();

//     function generarTablero() {
//         const tablero = document.getElementById("tablero");
//         for (let i = 0; i < 9; i++) {
//             let espacio = document.createElement("div")
//             espacio.classList.add("draggable")
//             espacio.textContent = "x";
//             espacio.setAttribute("id", i + 1)
//             tablero.appendChild(espacio);
//         }
//     }
// });


//Matrices de prueba

matrizObjetivo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
]

matrizEjercicio1 = [
  [1, 2, 3],
  [0, 4, 6],
  [7, 5, 8]
]

//Muestra la matriz en pantalla, utilizando la tabla en el html 
//matrix: matriz a imprimir
//documentTable: id de la tabla en el HTML
setDocumentTable = (matrix, documentTable) => {
    var documentTable = document.getElementById(documentTable) //Busca el elemento tabla en el HTML

    matrix.forEach(row => { //Por cada fila en la matriz,
        var rowTable = document.createElement("tr") //Crea un elemento tr

        row.forEach(column => { //Por cada columna en la fila 
            var columnTable = document.createElement("td") //crea un elemento td
            var columnText = document.createTextNode(column) //crea un nodo texto con la info de la columna

            columnTable.appendChild(columnText) //Append del texto al td 
            rowTable.appendChild(columnTable) //Apend del td al tr 
        });
        documentTable.appendChild(rowTable) // Append del rt al table
    });
}

setDocumentTable(matrizEjercicio1, 'table_Puzzle');

setDocumentTable(matrizObjetivo, 'table_PuzzleSolucion');


ejecutar = () => {

  console.log("hola");
}

/*
const draggables = document.querySelectorAll('.draggable')
const unselectedContainer = document.querySelector('.unselectedNumbers')
const selectedContainer = documenr.querySelector('.selectedNumbers')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    console.log("siuuuu")
  })
})*/