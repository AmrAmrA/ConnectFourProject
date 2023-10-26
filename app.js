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
    this.currentPlayer =
      this.currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
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
  lastEmptyHole ? placeTokenInColumn(lastEmptyHole) : ErrorMessageAppearence();
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
  horizontal: [],
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
    for (const element of gameData.vertical) {
      currentRow.push(element[i]);
    }
    horizontalDataArray.push(currentRow);
  }
  gameData.horizontal = horizontalDataArray;
}

formatVerticalArray();
formatHorizontalArray();

const bottomStore = {
  start: 4,
  end: 7,
  array: [],
  rowsLength: 5,
};

function checkDiagonalFromBottom() {
  for (let i = bottomStore.rowsLength; i > -1; i--) {
    const sliceEnd = Math.min(bottomStore.start++, bottomStore.end);
    bottomStore.array.push(gameData.horizontal[i].slice(0, sliceEnd));
  }
}
checkDiagonalFromBottom();

const rightAlgorithm = {
  firstAbove: 4,
  lastAbove: 7,
  startRow: 2,
  endRow: 6,
  combinations: [],
};


const leftAlgorithm = {
  firstAbove: 0,
  lastAbove: 3,
  combinations: [],
  startRow: 2,
  endRow: 6,
};


function winLeftDiagonals() {
  for (let j = leftAlgorithm.startRow; j < leftAlgorithm.endRow; j++) {
    const incrementFirstIndex = leftAlgorithm.firstAbove++;
    const incrementLastIndex = leftAlgorithm.lastAbove++;
    leftAlgorithm.combinations.push(
      gameData.horizontal[j].slice(incrementFirstIndex, incrementLastIndex)
    );
  }
}
winLeftDiagonals();
console.log(leftAlgorithm.combinations);


function winRightDiagonals() {
  for (let k = rightAlgorithm.startRow; k < rightAlgorithm.endRow; k++) {
    const decrementFirstIndex = rightAlgorithm.firstAbove--;
    const decrementLastIndex = rightAlgorithm.lastAbove++;
    rightAlgorithm.combinations.push(
      gameData.horizontal[k].slice(decrementFirstIndex, decrementLastIndex)
    );
  }
}
winRightDiagonals();
console.log(rightAlgorithm.combinations);
