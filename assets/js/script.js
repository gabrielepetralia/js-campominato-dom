const generate = document.querySelector(".generate-grid")
const reset = document.querySelector(".reset-grid")
const btnGenerateGrid = document.querySelector(".btn-generate-grid")
const btnResetGrid = document.querySelector(".btn-reset-grid")

const grid = document.querySelector(".grid-container")
let bombs=[];
const numBombs=3;
let points=0;

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
  bombs=[];
  points = 0;

  reset.classList.add("hide")
  generate.classList.remove("hide")
})


/*----------- Functions ----------- */

function generateCells(nCells) {
  for(let i = 0; i < nCells; i++)
  {
    const cell = document.createElement("div");
    cell.cellId = i + 1;
    cell.classList.add("cella");
    cell.addEventListener("click", handleClickCell);

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

function handleClickCell(){
  if(bombs.includes(this.cellId)) {
    this.classList.add("bomba");
    endGame();
  } else if(!this.classList.contains("clicked")){
    this.classList.add("clicked");
    points ++;
    console.log(points);

    const cells = document.getElementsByClassName("cella")
    if(points ===  cells.length - numBombs)
    {
      endGame();
    }
  }
}

function endGame(){
  const overlayEndGame = document.createElement("div");
  overlayEndGame.classList.add("overlay-end-game");
  grid.append(overlayEndGame);
  showBombs();
}

function showBombs(){
  const cells = document.getElementsByClassName("cella")
  for(let i = 0; i < cells.length; i++)
  {
    const cell = cells[i];
    if(bombs.includes(cell.cellId)) {
      cell.classList.add("bomba");
    }
  }
}