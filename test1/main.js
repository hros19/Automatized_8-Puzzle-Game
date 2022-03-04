document.addEventListener("DOMContentLoaded", () => {
  generarTablero();

  function generarTablero() {
    const tablero = document.getElementById("tablero");
    for (let i = 0; i < 9; i++) {
      let espacio = document.createElement("div")
      espacio.classList.add("draggable")
      espacio.textContent = "x";
      espacio.setAttribute("id", i + 1)
      tablero.appendChild(espacio);
    }
  }
});

/*
const draggables = document.querySelectorAll('.draggable')
const unselectedContainer = document.querySelector('.unselectedNumbers')
const selectedContainer = documenr.querySelector('.selectedNumbers')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    console.log("siuuuu")
  })
})*/