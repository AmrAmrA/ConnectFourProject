function getLastEmptyHole(column) {
  const holesArray = Array.from(column.children);
  return holesArray.findLast((element) => element.classList.contains("empty"));
}

function placeToken(hole, player) {
  hole.classList.remove("empty");
  hole.classList.add(player);
}

const game = {
  currentPlayer: "playerOne",
  playerOneMove: 0,
  playerTwoMove: 0,
  globalMoves: 0,
  countMoves() {
    this.globalMoves++;
    this.currentPlayer === "playerOne"
      ? this.playerOneMove++
      : this.playerTwoMove++;
  },
  switchPlayer() {
    if (this.currentPlayer === "playerOne") {
      this.currentPlayer = "playerTwo";
    } else {
      this.currentPlayer = "playerOne";
    }
  },
};

const messageError = document.querySelector(".messageError");
function ErrorMessageAppearence() {
  messageError.classList.add("active-animation");
  messageError.addEventListener("animationend", () => {
    messageError.classList.remove("active-animation");
  });
}


function handleColumnClick(column) {
  const lastEmptyHole = getLastEmptyHole(column);
  
  if (lastEmptyHole) {
    placeTokenInColumn(lastEmptyHole);
  } else {
    ErrorMessageAppearence();
  }
}

function placeTokenInColumn(hole) {
  placeToken(hole, game.currentPlayer);
  game.countMoves();
  game.switchPlayer();
}

const columns = document.querySelectorAll(".column");
for (const column of columns) {
  column.addEventListener("click", () => handleColumnClick(column));
}

function parseGame() {
  for(let i = 0; i < columns.length; i++) {
        console.log(columns[i].children);
         for(let j = 0; j < columns[i].children.length+1; j++) {
          console.log(columns[j].children[i]);
        
         }
  }
}
parseGame()