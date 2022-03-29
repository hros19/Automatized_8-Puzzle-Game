//const { Juego } = require('./Juego.js');
/* 
A* trabaja de forma similar que BFS con las sig diferencias
  - en lugar de una cola, se una cola de prioridad
    (En lugar de retornar el primer elemento que se agregó
    retorna el elemento con un valor menor)
  - para cada nuevo estado, se le asigna un valor definido como f(n) = g(n) + h(n)

Siendo g(n) la funcion de coste real. Es el coste necesario para ir desde el inicio hasta el estado n.

h(n) la funcion heuristica. Estima el costo para ir desde el estado (n) hasta el estado de solucion.


*/

// let estados = [];

// estados.push([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 0]
// ]);
// estados.push([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 0, 8]
// ]);

// let i = estados.length - 1;
// while (i >= 0) {
//     console.log(estados[i]);
//     i--;
// }


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
  [1, 8, 2],
  [0, 4, 3],
  [7, 6, 5]
]


let juegoMain = new Juego(matrizObjetivo)
var selectedAlgorithm = 'A*'   //'A*' ejecuta AEstrella  'Back' ejecuta Backtracking
var solucionPasoAPaso = 0



//Devuelve la fila y la columna de un elemento en la matriz
getRowColumn = (matrix, search) =>{
  const row = matrix.findIndex(row => row.includes(search))
  const col = matrix[row].indexOf(search)
  return [row,col]
}


//Intercambia el número en la celda, con la posicion del original en la matriz 
swapCellInfo = ( originalNumber, currentNumber, originalMatrix ) => {

  originalPos = getRowColumn(originalMatrix, originalNumber)  
  currentPos = getRowColumn(originalMatrix, currentNumber)

  var newMatrix = originalMatrix.map( arr => arr.slice() )                  


  newMatrix[originalPos[0]][originalPos[1]] = currentNumber
  newMatrix[currentPos[0]][currentPos[1]] = originalNumber

  if( juegoMain.tieneSolucion(newMatrix)){
    console.log("Tiene Solución");
    //juegoMain.tablero = newMatrix  //Se cambia el tablero del juego
    setDocumentTable(newMatrix, 'table_Puzzle')
  }else{
    console.log("NO Tiene Solución");
    alert("No tiene solución, no se puede hacer ese cambio")
    setDocumentTable(originalMatrix, 'table_Puzzle')
  }

}

//Se encarga de cambiar el valor de la celda 
setCellInfo = (input, originalMatrix) => {
  var td = input.parentElement
  var originalText = input.parentElement.getAttribute('data-text')
  var currentText = input.value

  td.removeAttribute('data-clicked')
  td.removeAttribute('data-text')
  if( isNaN(currentText) ){
    alert('No puede Ingresar Texto')

  }else if( parseInt(currentText) > 8 || parseInt(currentText) < 0 ){
    alert('Debe ingresar un número entre 0-8')

  }else if( originalText != currentText ){

    swapCellInfo(parseInt(originalText), parseInt(currentText), originalMatrix)
     //td.innerHTML = currentText
     //console.log(originalText + " ahora es " + currentText);
    return
  }

  td.innerHTML = originalText
  console.log('No se realizaron cambios');

}

//Función que agrega un input a la celda de la tabla, para editar su contenido 
//
setCellEditable = (htmlElement) => {

  if( htmlElement.hasAttribute('data-clicked') ){
    return
  }
  
  htmlElement.setAttribute('data-cliked','yesy')
  htmlElement.setAttribute('data-text', htmlElement.innerHTML)
  
  const originalMatrix = getMatrizDocument("table_Puzzle")   //Acá me da la matriz original
  
  var input = document.createElement('input')
  input.setAttribute('type','text')
  input.value = htmlElement.innerHTML
  input.onblur = function(){setCellInfo(input, originalMatrix)}  //Llama la función de cambiar el contenido cuando se da click en otro lado 

  htmlElement.innerHTML = ''
  htmlElement.append(input)
  htmlElement.firstElementChild.select()
  
}

//Muestra la matriz en pantalla, utilizando la tabla en el html 
//matrix: matriz a "imprimir"
//documentTable: id de la tabla en el HTML
setDocumentTable = (matrix, documentTable) => {

  var documentTable = document.getElementById(documentTable) //Busca el elemento tabla en el HTML

  
  //Verifica si table tiene elementos, si los tiene los elimina. 
  while (documentTable.hasChildNodes()) {
    documentTable.removeChild(documentTable.firstChild);
  }
  
  //Agrega los elementos de la matriz 
  matrix.forEach(row => { //Por cada fila en la matriz,
      var rowTable = document.createElement("tr") //Crea un elemento tr

      row.forEach(column => { //Por cada columna en la fila 
          var columnTable = document.createElement("td") //crea un elemento td
          var columnText = document.createTextNode(column)

          // const columnText = document.createElement("input");
          // columnText.setAttribute('type', "text");
          // columnText.setAttribute('value', column);


          columnTable.appendChild(columnText) //Append del texto al td 
          columnTable.onclick = function(){ setCellEditable(this)} //EN FASE DE PRUEBA, acá agrega la función a cada celda

          if(column == 0){
            columnTable.setAttribute('class', 'blank_piece')
          }

          rowTable.appendChild(columnTable) //Apend del td al tr 
      });
      documentTable.appendChild(rowTable) // Append del rt al table
  });
}


// Función para tomar la info de la matriz del html y convertila en una lista
// para iniciar el juego 

getMatrizDocument = (nombreTablaHTML) => {
  var tableObj = document.getElementById( nombreTablaHTML );
  var arr = [];
  var allTRs = tableObj.getElementsByTagName( "tr" );
  for ( var trCounter = 0; trCounter < allTRs.length; trCounter++ )
  {
    var tmpArr = [];
    var allTDsInTR = allTRs[ trCounter ].getElementsByTagName( "td" );
    for ( var tdCounter = 0; tdCounter < allTDsInTR.length; tdCounter++ )
    {
        var digit = parseInt( allTDsInTR[ tdCounter ].innerHTML )
        tmpArr.push( digit );
    }
    arr.push( tmpArr );
  }
  return(arr)
}


//Retorna la Solucion dependiendo del algoritmo seleccionado 
const getSolution = () => {

  if (selectedAlgorithm == "A*") {

    console.log("Resolviendo con A*")  //Solo para probar que el juego funcione
    juegoMain.tablero = getMatrizDocument('table_Puzzle')
    return  juegoMain.algoritmoAEstrella()
    
  }else{

    console.log("Resolviendo con Bactracking")  //Solo para probar que el juego funcione
    juegoMain.tablero = getMatrizDocument('table_Puzzle')
    return juegoMain.algoritmoBacktracking()
  }
}


//
const nextStep = () => {
  console.log("Siguiente paso");
  //Bloquear la Matriz 
  document.getElementById("table_Puzzle").classList.remove("enableTable") //
  document.getElementById("table_Puzzle").classList.add("disableTable") //

  alert("No puede editar la tabla mientras ejecuta el juego paso a paso ")
  
  if (!Array.isArray(solucionPasoAPaso)) {
    solucionPasoAPaso = getSolution()
    setDocumentTable(solucionPasoAPaso.shift().estado,'table_Puzzle' )  //Muestra el Siguiente paso en la interfaz
    //Bloquear los botones de solución
  }

  if (solucionPasoAPaso.length > 0) {
    setDocumentTable(solucionPasoAPaso.shift().estado,'table_Puzzle' )  //Muestra el Siguiente paso en la interfaz
  }else{
    alert('Ya llegó a la solución')
  }

}



//Detiene la ejecución una cantidad de milisegundos 
sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Devuelve el Siguiente paso en la lista de elementos 


//Recorre la matriz de solución paso a paso
const showSolution = async (camino) => {
  var runAgainButton = document.getElementById('run_Button')
  
  runAgainButton.setAttribute('disabled',true);

  while (camino.length != 0 ) {
    setDocumentTable(camino.shift().estado,'table_Puzzle' )
    await sleep(100);
  }
  runAgainButton.removeAttribute('disabled');
}




const runSolution = () => {
  //revizar Primero si tiene solución antes de ejecutar el algoritmo
  //Inclusive cada vez que se cambia
  solucionPasoAPaso = 0 //Si ejecuta el paso a paso y se cansa y le da ejecutar, tonses resetea solucionPAP para que no vuelva de donde lo dejó 
  showSolution(getSolution()) //Muestra la solucion paso a paso 

}


const changeAlgorithm = () => {
  //solucionPasoAPaso = 0 //Si cambia el algoritmo, resetea el paso a pas//o No funcionó 
  var tableroHTML = document.getElementById( 'tablero' )
  var algNameHTML = document.getElementById('alg_Name')

  if(selectedAlgorithm == 'A*'){
    selectedAlgorithm = 'Back'
    console.log("Backtracking Seleccionado");  
    
    tableroHTML.setAttribute('class', 'box_tablero bodyB')
    algNameHTML.innerHTML = 'Backtracking'
    
    
  }else{
    selectedAlgorithm = "A*"
    console.log("A* Seleccionado");  
    tableroHTML.setAttribute('class', 'box_tablero bodyA')
    algNameHTML.innerHTML = 'A Estrella'
  }


}

const resetAll = () => {
  console.log("Reiniciando Juego");

  document.getElementById("table_Puzzle").classList.remove("disableTable") //
  document.getElementById("table_Puzzle").classList.add("enableTable") //

  juegoMain = new Juego(matrizObjetivo)
  selectedAlgorithm = 'A*'   //'A*' ejecuta AEstrella  'Back' ejecuta Backtracking
  solucionPasoAPaso = 0
  setDocumentTable(matrizEjercicio1, 'table_Puzzle');
}

const changeWBlanck = () => {
  const number = document.getElementById("changeWBlank_Input")
  if( number != '' && parseInt(number) > 0 && parseInt(number) <= 8 ){
    swapCellInfo( 0, parseInt(number.value), getMatrizDocument('table_Puzzle') )
    solucionPasoAPaso = getSolution() //Carga la nueva solución en la lista 
  }else{
    alert("Debe ingresar un número entre 1-8 en el input, para intercambiar con la pieza vacía")
  }

}


setDocumentTable(matrizEjercicio1, 'table_Puzzle');