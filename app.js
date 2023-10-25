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

const gameData = {
  vertical: [],
  horizontal: []
};

function formatVerticalArray() {
  let verticalDataArray = [];
  for (let i = 0; i < columns.length; i++) {
    verticalDataArray.push(Array.from(columns[i].children));
  }
  gameData.vertical = verticalDataArray;
}

function formatHorizontalArray() {
  let horizontalDataArray = [];
  for (let i = 0; i < 6; i++) { 
    let currentRow = [];
    for (let j = 0; j < gameData.vertical.length; j++) {
      currentRow.push(gameData.vertical[j][i]);
    }
    horizontalDataArray.push(currentRow);
  }
  gameData.horizontal = horizontalDataArray;
}


formatVerticalArray();
formatHorizontalArray();


// console.log(gameData.vertical);
// console.log(gameData.horizontal);

const bottomStore = {
  start : 3,
  end : 7,
  array : [],
  rowsLength : 5
}

function checkDiagonalFromBottom() {
    for (let i = bottomStore.rowsLength; i > -1; i--) {
        const sliceEnd = Math.min(bottomStore.start++, bottomStore.end);
        bottomStore.array.push(gameData.horizontal[i].slice(0, bottomStore.start))
      }
}
checkDiagonalFromBottom()
console.log(bottomStore.array);