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

const algorithmsStore = {
  startRow: 2,
  endRow: 6,
  leftDiagonal: {
    combinations: [],
    start: 0,
    end: 3,
  },
  rightDiagonal: {
    combinations: [],
    start: 4,
    end: 7,
  },

  middleDiagonal : {
    rightCombinations : [], 
    leftCombinations  : [], 
    rightTop    : 3,
    leftTop     : 3, 
  }
};

function computeDiagonalCombinations() {
  for (let j = algorithmsStore.startRow; j < algorithmsStore.endRow; j++) {
    const incrementLastleftIndex = algorithmsStore.leftDiagonal.start++;
    const incrementFirstLeftIndex = algorithmsStore.leftDiagonal.end++;

    const decrementLastRightIndex = algorithmsStore.rightDiagonal.start--;
    const decrementFirstRightIndex = algorithmsStore.rightDiagonal.end--;
    algorithmsStore.leftDiagonal.combinations.push(
      gameData.horizontal[j].slice(
        incrementLastleftIndex,
        incrementFirstLeftIndex
      )
    );

    algorithmsStore.rightDiagonal.combinations.push(
      gameData.horizontal[j].slice(
        decrementLastRightIndex,
        decrementFirstRightIndex
      )
    );
  }
}
computeDiagonalCombinations();
console.log(algorithmsStore.leftDiagonal.combinations);
console.log(algorithmsStore.rightDiagonal.combinations);


function computeMiddleCombinations() {
  for (let j = algorithmsStore.startRow; j < algorithmsStore.endRow; j++) {
        const incrementRightTopIndex = algorithmsStore.middleDiagonal.rightTop ++;
        const decrementLeftTopxIndex = algorithmsStore.middleDiagonal.leftTop--; 
        algorithmsStore.middleDiagonal.rightCombinations.push((gameData.horizontal[j][incrementRightTopIndex]));
        algorithmsStore.middleDiagonal.leftCombinations.push((gameData.horizontal[j][decrementLeftTopxIndex])); 
  }
}

computeMiddleCombinations()
console.log(algorithmsStore.middleDiagonal.rightCombinations);
console.log(algorithmsStore.middleDiagonal.leftCombinations);