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
  console.log(bombs) //togliere fix
  
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


/*------------------ Functions ------------------*/

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

    /* Controllo numero bombe vicine */

    // vettore celle vicine
    let nearbyCells = [];

    // Controllo se la cella è nella PRIMA colonna
    // se l'id della cella PRECEDENTE è MULTIPLO della r.q. del num totale celle (7,9,10) => la cella è nella PRIMA colonna
    // (es: (id-1 % 10) ?) se dà 0 allora è multiplo quindi inverto lo 0 (FALSE) in TRUE e entro nell'if che pusherà gli id delle celle NON a SX nel vettore
    if(!((this.cellId-1)%Math.sqrt(cells.length))){
      nearbyCells.push(this.cellId+1) // cella SUCCESSIVA

      // Controllo che la cella NON sia nella PRIMA riga
      // se il suo id è > della r.q. del num totale celle (7,9,10) => la cella NON è nella PRIMA riga
      // (es: (id > 10) ?) se TRUE posso pushare gli id delle celle di sopra nel vettore
      if(this.cellId>Math.sqrt(cells.length)){
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)) // cella SOPRA
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)+1) // cella SOPRA dx
      }

      // Controllo che la cella NON sia nell'ULTIMA riga
      // se il suo id è <= alla differenza tra il num totale celle e la sua r.q. (7,9,10) => la cella NON è nell'ULTIMA riga
      // (es: (id <= 100-10) ?) se TRUE posso pushare gli id delle celle di sotto nel vettore
      if(this.cellId<=(cells.length-Math.sqrt(cells.length))){
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)) // cella SOTTO
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)+1) // cella SOTTO dx
      }
    } 

    // Controllo se la cella è nell'ULTIMA colonna
    // se l'id della cella è MULTIPLO della r.q. del num totale celle (7,9,10) => la cella è nell'ULTIMA colonna
    // (es: (id % 10) ?) se dà 0 allora è multiplo quindi inverto lo 0 (FALSE) in TRUE e entro nell'if che pusherà gli id delle celle NON a DX nel vettore
    if(!((this.cellId)%Math.sqrt(cells.length))){
      nearbyCells.push(this.cellId-1) // cella PRECEDENTE

      // Controllo che la cella NON sia nella PRIMA riga
      if(this.cellId>Math.sqrt(cells.length)){
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)) // cella SOPRA
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)-1) // cella SOPRA sx
      }

      // Controllo se la cella NON sia nell'ULTIMA riga
      if(this.cellId<=(cells.length-Math.sqrt(cells.length))){
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)) // cella SOTTO
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)-1) // cella SOTTO sx
      }
    } 

    // Controlla se la cella NON è nè nella PRIMA nè nell'ULTIMA colonna
    // se TRUE posso pushare gli id di tutte le celle circostanti nel vettore (eccetto quando la cella è nella prima o ultima riga)
    if(((this.cellId-1)%Math.sqrt(cells.length)) && ((this.cellId)%Math.sqrt(cells.length)))
    {
      nearbyCells.push(this.cellId-1) // cella PRECEDENTE
      nearbyCells.push(this.cellId+1) // cella SUCCESSIVA

      // Controllo che la cella NON sia nella PRIMA riga
      if(this.cellId>Math.sqrt(cells.length)){
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)-1) // cella SOPRA sx
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)) // cella SOPRA
        nearbyCells.push(this.cellId-Math.sqrt(cells.length)+1) // cella SOPRA dx
      }

      // Controllo che la cella NON sia nell'ULTIMA riga
      if(this.cellId<=(cells.length-Math.sqrt(cells.length))){
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)-1) // cella SOTTO sx
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)) // cella SOTTO
        nearbyCells.push(this.cellId+Math.sqrt(cells.length)+1) // cella SOTTO dx
      }
    }
    
    console.log(nearbyCells) //togliere fix

    // numero bombe vicine
    let numNearbyBombs = 0;

    // Controllo se gli id delle celle vicine corrispondono con quelli delle bombe
    // ogni volta che trovo una corrispondenza incremento il counter
    for(let i=0; i < nearbyCells.length; i++) {
      if(bombs.includes(nearbyCells[i]))
      {
        numNearbyBombs++;
      }
    }

    // stampo il numero di bombe vicine nella cella
    this.innerHTML= numNearbyBombs;
    /* [end] Controllo numero bombe vicine */

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