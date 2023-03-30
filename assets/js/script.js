const generate = document.querySelector(".generate-grid")
const reset = document.querySelector(".reset-grid")
const btnGenerateGrid = document.querySelector(".btn-generate-grid")
const btnResetGrid = document.querySelector(".btn-reset-grid")

const grid = document.querySelector(".grid-container")

btnGenerateGrid.addEventListener("click", function(){
  const diff = document.querySelector(".select-diff").value;
  let max;
  switch(diff)
  {
    case("diff-1") :
      max = 100;
      break;
    case("diff-2") :
      max = 81;
      break;
    case("diff-3") :
      max = 49;
      break;
  }

  for(let i = 0; i < max; i++)
  {
    const cella = document.createElement("div")
    cella.cellaId = i + 1;
    cella.addEventListener("click", function(){
      cella.classList.add("clicked");
      console.log(this.cellaId)
    })
    cella.classList.add("cell")

    if(!(i%Math.sqrt(max))) {
      const row = document.createElement("div")
      row.classList.add("grid-row")
      grid.append(row);
    }

    const row = document.querySelector(".grid-row:last-child")
    row.append(cella);
  }
  
  generate.classList.add("hide")
  reset.classList.remove("hide")
})

btnResetGrid.addEventListener("click", function(){
  grid.innerHTML = "";

  reset.classList.add("hide")
  generate.classList.remove("hide")
})