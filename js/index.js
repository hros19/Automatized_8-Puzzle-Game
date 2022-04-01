
//Matrices de prueba
matrizObjetivo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
]

matrizEjercicio1 = [
  [2, 1, 3],
  [4, 5, 6],
  [8, 7, 0]
]

matrizBackup = matrizEjercicio1;

let juegoMain = new Juego(matrizObjetivo)
var selectedAlgorithm = 'A*'   //'A*' ejecuta AEstrella  'Back' ejecuta Backtracking
var solucionPasoAPaso = 0
var isStepByStep = false

shuffle = () => {
    do {
        juegoMain.tablero = obtenerMatrizRandom();
        matrizEjercicio1 = juegoMain.tablero;
    } while (!juegoMain.esTableroValido() || !juegoMain.tieneSolucion(juegoMain.tablero))

    setDocumentTable(matrizEjercicio1, 'table_Puzzle');
}

/**
 * Function that returns a random value in a range (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @return Value between min and max (including both values).
 */
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @return Una matriz completamente random con valores unicos de 0 a 8.
 */
obtenerMatrizRandom = () => {
    let valores = [];
    let res = [[0,0,0],[0,0,0],[0,0,0]];
    for (let i in res) {
        for (let j in res[i]) {
            let entro = false;
            let num;
            do {
                num = generateRandomIntegerInRange(0, 8);
                entro = (valores.indexOf(num) == -1)
                valores.push(num)
            } while (!entro)
            valores.push(num)
            res[i][j] = num; 
        }
    }
    return res;
}

//Devuelve la fila y la columna de un elemento en la matriz
getRowColumn = (matrix, search) => {
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
  setDocumentTable(newMatrix, 'table_Puzzle')
}

getCoordinatesOfPiece = (matrix, piece) => {
    return matrix[row][column];
}

//Se encarga de cambiar el valor de la celda 
setCellInfo = (input, originalMatrix) => {
  var td = input.parentElement
  var originalText = input.parentElement.getAttribute('data-text')
  var currentText = input.value

  td.removeAttribute('data-clicked')
  td.removeAttribute('data-text')
  //console.log("O: ", originalText)
  //console.log("C: ", currentText)
  if ( isNaN(currentText) ) {
    alert('No puede Ingresar Texto')
  } 
  else if( parseInt(currentText) > 8 || parseInt(currentText) < 0 ) {
    alert('Debe ingresar un número entre 0-8')
  } 
  else if( originalText != currentText ) {
    swapCellInfo(parseInt(originalText), parseInt(currentText), originalMatrix)
    return
  }
  td.innerHTML = originalText
  console.log('No se realizaron cambios');
}

//Función que agrega un input a la celda de la tabla, para editar su contenido 
setCellEditable = (htmlElement) => {
  if (!isStepByStep) {
    if ( htmlElement.hasAttribute('data-clicked') ) {
      return
    }
    if (htmlElement.innerHTML in ["0","1","2","3","4","5","6","7","8"] == false) {
        return;
    }
    htmlElement.setAttribute('data-cliked','yesy')
    htmlElement.setAttribute('data-text', htmlElement.innerHTML)
    
    const originalMatrix = getMatrizDocument("table_Puzzle")   //Acá me da la matriz original
    
    var input = document.createElement('input')
    input.setAttribute('type','text')
    input.value = htmlElement.innerHTML
    console.log(input, input.value)
    input.onblur = function(){setCellInfo(input, originalMatrix)}  //Llama la función de cambiar el contenido cuando se da click en otro lado 
  
    htmlElement.innerHTML = ''
    htmlElement.append(input)
    htmlElement.firstElementChild.select()
  }
  else {
    console.log("No se puede editar en paso a paso");
  }
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
          var columnText = document.createTextNode(column) //Crea un nodo de texto con el valor de la columna
          columnTable.appendChild(columnText) //Append del texto al td 
          columnTable.onclick = function(){ setCellEditable(this)} //EN FASE DE PRUEBA, acá agrega la función a cada celda

          if (column == 0) {
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
  for ( var trCounter = 0; trCounter < allTRs.length; trCounter++ ) {
    var tmpArr = [];
    var allTDsInTR = allTRs[ trCounter ].getElementsByTagName( "td" );
    for ( var tdCounter = 0; tdCounter < allTDsInTR.length; tdCounter++ ) {
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
    return  juegoMain.algoritmoAEstrella() 
  }
  else {
    console.log("Resolviendo con Bactracking")  //Solo para probar que el juego funcione
    solucionBack = juegoMain.algoritmoBacktracking()
    if (solucionBack != []) {
      alert("Es posible que el algoritmo no pueda resolver esta matriz")
      return false
    }
    else {
      return solucionBack
    }
  }    
}

// Go thorugh next step on the algorithm
const nextStep = () => {
  console.log("Siguiente paso");
  isStepByStep = true

  if (!Array.isArray(solucionPasoAPaso)) {
    juegoMain.tablero = getMatrizDocument('table_Puzzle')
    if (juegoMain.esTableroValido()) {
      solucionPasoAPaso = getSolution()
      setDocumentTable(solucionPasoAPaso.shift().estado,'table_Puzzle' )  //Muestra el Siguiente paso en la interfaz
      //Bloquear los botones de solución
    }
    else {
      alert("El tablero no tiene solución")
    } 
  }
  if (solucionPasoAPaso.length > 0) {
    setDocumentTable(solucionPasoAPaso.shift().estado,'table_Puzzle' )  //Muestra el Siguiente paso en la interfaz
  } else {
    alert('Ya llegó a la solución')
  }
}

//Detiene la ejecución una cantidad de milisegundos 
sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Recorre la matriz de solución paso a paso
const showSolution = async (camino) => {
  isStepByStep = true
  var runAgainButton = document.getElementById('run_Button')
  var changeAlgorithmBtn = document.getElementById('changeAlg_Button')
  var nextStepBtn = document.getElementById('nextStep_Button')
  var resetBtn = document.getElementById('reset_Button')
  var changeWBlankbtn = document.getElementById('changeWBlank_Button')

  runAgainButton.setAttribute('disabled',true);
  changeAlgorithmBtn.setAttribute('disabled',true);
  nextStepBtn.setAttribute('disabled',true);
  resetBtn.setAttribute('disabled',true);
  changeWBlankbtn.setAttribute('disabled',true);

  while (camino.length != 0 ) {
    setDocumentTable(camino.shift().estado,'table_Puzzle' )
    await sleep(100);
  }
  isStepByStep = false
  runAgainButton.removeAttribute('disabled');
  changeAlgorithmBtn.removeAttribute('disabled');
  nextStepBtn.removeAttribute('disabled');
  resetBtn.removeAttribute('disabled');
  changeWBlankbtn.removeAttribute('disabled');
}

// Give the alert with the path to the user.
const alertSolution = () => {
    alert(juegoMain.obtenerMovimientos());
}

// Go ahead with the animation following the path with the answer.
const runSolution = () => {
  juegoMain.tablero = getMatrizDocument('table_Puzzle')

  if (juegoMain.esTableroValido()) {
    solucionPasoAPaso = 0 //Si ejecuta el paso a paso y se cansa y le da ejecutar, tonses resetea solucionPAP para que no vuelva de donde lo dejó 
    if (!getSolution()) {
      console.log("No se pudo dar solución con backtracking");
    }
    else {
        let res = getSolution()
        alertSolution() //Muestra la solucion en un alert 
      showSolution(res) //Muestra la solucion paso a paso
    } 
  }
  else {
    alert("El tablero no tiene solución")
  }
}

// switch algorithm
const changeAlgorithm = () => {
  var tableroHTML = document.getElementById( 'tablero' )
  var algNameHTML = document.getElementById('alg_Name')

  if (selectedAlgorithm == 'A*') {
    selectedAlgorithm = 'Back'
    console.log("Backtracking Seleccionado");  
    tableroHTML.setAttribute('class', 'box_tablero bodyB')
    algNameHTML.innerHTML = 'Backtracking'
  }
  else {
    selectedAlgorithm = "A*"
    console.log("A* Seleccionado");  
    tableroHTML.setAttribute('class', 'box_tablero bodyA')
    algNameHTML.innerHTML = 'A Estrella'
  }
}

const resetAll = () => {
  console.log("Reiniciando Juego");
  isStepByStep = false
  juegoMain = new Juego(matrizObjetivo)
  selectedAlgorithm = 'A*'   //'A*' ejecuta AEstrella  'Back' ejecuta Backtracking
  solucionPasoAPaso = 0
  setDocumentTable(matrizBackup, 'table_Puzzle');
}

const obtpiezaBlanca = (lista) => { 
  //Saber donde está el 0
  for (let fila = 0; fila < lista.length; fila++) {
    for(let columna = 0; columna < lista.length; columna++ ){
      if (lista[fila][columna] == 0) {
        return [fila, columna]
      }
    }
  }
}

const obtenerPiezasMovibles = ( lista ) => {
  // Buscamos las piezas que están alrededor de 0.
  let posPzaBlanca = obtpiezaBlanca(lista)
  let filaPzaB = posPzaBlanca[0]
  let colPzaB = posPzaBlanca[1]
  //Pieza blanca en el mero centro
  if (filaPzaB == 1 && colPzaB == 1) {
      return [lista[0][1], lista[1][0], lista[1][2], lista[2][1]]
  }
  //Pieza blanca esquinera
  if (filaPzaB == 0 && colPzaB == 0) {
      return [lista[0][1], lista[1][0]]
  }
  if (filaPzaB == 0 && colPzaB == 2) {
      return [lista[0][1], lista[1][2]]
  }
  if (filaPzaB == 2 && colPzaB == 0) {
      return [lista[2][1], lista[1][0]]
  }
  if (filaPzaB == 2 && colPzaB == 2) {
      return [lista[2][1], lista[1][2]]
  }
  //Pieza blanca como arista
  if (filaPzaB == 0 && colPzaB == 1) {
      return [lista[0][0], lista[0][2], lista[1][1]]
  }
  if (filaPzaB == 1 && colPzaB == 0) {
      return [lista[0][0], lista[2][0], lista[1][1]]
  }
  if (filaPzaB == 1 && colPzaB == 2) {
      return [lista[0][2], lista[2][2], lista[1][1]]
  }
  if (filaPzaB == 2 && colPzaB == 1) {
      return [lista[2][0], lista[2][2], lista[1][1]]
  }
  return ["ERROR INDEXADO obtenerPiezasMovibles()"]
}

const checkMov = (lista, movimiento) => {
  var posiblesMovimientos = obtenerPiezasMovibles(lista)
  for(let i = 0; i <posiblesMovimientos.length; i++) {
    console.log(posiblesMovimientos[i]);
    if( posiblesMovimientos[i] == movimiento ) {
      return true
    }
  }
  return false
}

// Manual change of piece.
const changeWBlanck = () => {
  const number = document.getElementById("changeWBlank_Input")
  if ( number.value != '' && parseInt(number.value) > 0 && parseInt(number.value) <= 8 ) {
    if (checkMov(getMatrizDocument('table_Puzzle'), number.value)) {
      swapCellInfo( 0, parseInt(number.value), getMatrizDocument('table_Puzzle') )
      solucionPasoAPaso = 0 //Carga la nueva solución en la lista 
    }
    else {
      alert("Solo puede mover las piezas cercanas al 0 ")
    }
  }
  else {
    alert("Debe ingresar un número entre 1-8 en el input, para intercambiar con la pieza vacía")
  }
}

setDocumentTable(matrizEjercicio1, 'table_Puzzle');