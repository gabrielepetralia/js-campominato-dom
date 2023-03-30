const generate = document.querySelector(".generate-grid")
const reset = document.querySelector(".reset-grid")
const btnPlay = document.querySelector(".btn-play")
const btnRestart = document.querySelector(".btn-restart")

const grid = document.querySelector(".grid-container")
const endMessage = document.querySelector(".end-message")
let bombs = [];
const numBombs = 16;
let points = 0;

btnPlay.addEventListener("click", function(){
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
  
  generate.classList.add("hide")
  reset.classList.remove("hide")
})

btnRestart.addEventListener("click", function(){
  grid.innerHTML = "";
  endMessage.innerHTML = "";
  bombs = [];
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
  const cells = document.getElementsByClassName("cella")
  if(bombs.includes(this.cellId)) {
    this.classList.add("bomba");
    endGame(false,cells.length);
  } else if(!this.classList.contains("clicked")){
    this.classList.add("clicked");
    points ++;

    if(points ===  cells.length - numBombs)
    {
      endGame(true,cells.length);
    }
  }
}

function endGame(isWin,numCells){
  const overlayEndGame = document.createElement("div");
  overlayEndGame.classList.add("overlay-end-game");
  grid.append(overlayEndGame);
  showBombs();

  if(isWin){
    endMessage.innerHTML = `Hai vinto! Hai totalizzato ben ${points} punti su ${numCells - numBombs}!`
  } else {
    endMessage.innerHTML = `Hai perso! Hai totalizzato solo ${points} punti su ${numCells - numBombs}!`
  }
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