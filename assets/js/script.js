const generate = document.querySelector(".generate-grid")
const reset = document.querySelector(".reset-grid")
const btnGenerateGrid = document.querySelector(".btn-generate-grid")
const btnResetGrid = document.querySelector(".btn-reset-grid")

const grid = document.querySelector(".grid-container")
const bombs=[];
const numBombs=16;

btnGenerateGrid.addEventListener("click", function(){
  const diff = document.querySelector(".select-diff").value;
  let numCells;
  switch(diff)
  {
    case("easy") :
      numCells = 100;
      break;
    case("hard") :
      numCells = 81;
      break;
    case("crazy") :
      numCells = 49;
      break;
  }

  generateCells(numCells);
  generateBombs(numCells);
  console.log(bombs)
  
  generate.classList.add("hide")
  reset.classList.remove("hide")
})

btnResetGrid.addEventListener("click", function(){
  grid.innerHTML = "";

  reset.classList.add("hide")
  generate.classList.remove("hide")
})


/*----------- Functions ----------- */

function generateCells(nCells) {
  for(let i = 0; i < nCells; i++)
  {
    const cell = document.createElement("div")
    cell.cellId = i + 1;
    cell.addEventListener("click", function(){
      cell.classList.add("clicked");
      console.log(this.cellId)
    })
    cell.classList.add("cella")

    if(!(i%Math.sqrt(nCells))) {
      const row = document.createElement("div")
      row.classList.add("grid-row")
      grid.append(row);
    }

    const row = document.querySelector(".grid-row:last-child")
    row.append(cell);
  }
}

function generateBombs(nCells) {
  while(bombs.length < numBombs)
  {
    const bomb = getRandomNumber(1,nCells)
    if(!bombs.includes(bomb)) bombs.push(bomb);
  }
}

function getRandomNumber(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}