import { sayHello } from "./modules/check.js";

/**
 * The above code is a JavaScript implementation of a Connect Four game, including functions for
 * handling player moves, switching players, checking for winning combinations, and formatting game
 * data.
 * @param column - The `column` parameter represents the column element that was clicked by the user.
 * @returns The code does not have a specific return statement. It consists of various functions and
 * operations that manipulate the game state and store data in different arrays and objects.
 */
function getLastEmptyHole(column) {
  const holesArray = Array.from(column.children);
  return holesArray.findLast((element) => element.classList.contains("empty"));
}

/**
 * The function "placeToken" adds a class to a specified element to represent a player's token being
 * placed in a hole.
 * @param hole - The "hole" parameter represents the element or element ID of the hole where the token
 * will be placed. It is used to identify the specific hole on the game board where the token will be
 * placed.
 * @param player - The player parameter represents the class name that will be added to the hole
 * element.
 */
function placeToken(hole, player) {
  hole.classList.remove("empty");
  hole.classList.add(player);
}

/* The `game` object represents the state of the Connect Four game. It has properties such as
`currentPlayer`, `playerOneMove`, `playerTwoMove`, and `globalMoves`. */
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

/**
 * The function adds and removes a CSS class to display an error message with an animation.
 */
const messageError = document.querySelector(".messageError");
function ErrorMessageAppearence() {
  messageError.classList.add("active-animation");
  messageError.addEventListener("animationend", () => {
    messageError.classList.remove("active-animation");
  });
}

/**
 * The function handles a column click event by placing a token in the last empty hole of the column or
 * displaying an error message if the column is full.
 * @param column - The column parameter represents the column number or index where the click event
 * occurred.
 */

function handleColumnClick(column) {
  const lastEmptyHole = getLastEmptyHole(column);
  lastEmptyHole ? placeTokenInColumn(lastEmptyHole) : ErrorMessageAppearence();
  console.log(column);
}

/**
 * The function places a token in a specified column, updates the move count, and switches the current
 * player.
 * @param hole - The parameter "hole" represents the column number where the token should be placed.
*/
function placeTokenInColumn(hole) {
  placeToken(hole, game.currentPlayer);
  game.countMoves();
  game.switchPlayer();
  console.log(hole);
}

/* The code is selecting all elements with the class name "column" using the
`document.querySelectorAll` method and storing them in the `columns` constant. */
const columns = document.querySelectorAll(".column");
for (const column of columns) {
  column.addEventListener("click", () => handleColumnClick(column));
}

/* The `gameData` object is used to store the game board data in a formatted manner. It has two
properties: `vertical` and `horizontal`. */
const gameData = {
  vertical: [],
  horizontal: [],
};

/**
 * The function "formatVerticalArray" creates a verticalDataArray by converting the children of each
 * element in the "columns" array into an array and assigns it to the "gameData.vertical" property.
 */
function formatVerticalArray() {
  let verticalDataArray = [];
  for (let i = 0; i < columns.length; i++) {
    verticalDataArray.push(Array.from(columns[i].children));
  }
  gameData.vertical = verticalDataArray;
}

/**
 * The function `formatHorizontalArray` takes an array `gameData.vertical` and converts it into a
 * horizontal array `gameData.horizontal` by transposing the elements.
 */
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

/**
 * The function `checkDiagonalFromBottom` iterates over a range of rows and slices a portion of each
 * row from a 2D array and pushes it into another array.
 */
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

/* The `algorithmsStore` object is used to store various properties and arrays related to diagonal
combinations in the Connect Four game. */
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

  middleDiagonal: {
    rightCombinations: [],
    leftCombinations: [],
    rightTop: 3,
    leftTop: 3,
  },
};

/**
 * The function `computeDiagonalBottomCombinations` computes diagonal combinations from a given set of
 * horizontal data.
 */
function computeDiagonalBottomCombinations() {
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
computeDiagonalBottomCombinations();

/**
 * The function computes the middle combinations of a game by iterating through rows and adding
 * elements to the right and left diagonal combinations.
 */
function computeMiddleCombinations() {
  for (let j = algorithmsStore.startRow; j < algorithmsStore.endRow; j++) {
    const incrementRightTopIndex = algorithmsStore.middleDiagonal.rightTop++;
    const decrementLeftTopxIndex = algorithmsStore.middleDiagonal.leftTop--;
    algorithmsStore.middleDiagonal.rightCombinations.push(
      gameData.horizontal[j][incrementRightTopIndex]
    );
    algorithmsStore.middleDiagonal.leftCombinations.push(
      gameData.horizontal[j][decrementLeftTopxIndex]
    );
  }
}

// computeMiddleCombinations();

const algoHorizontalStore = {
  horizontalCombinations: [],
};
/* The code `algoHorizontalStore.horizontalCombinations = gameData.horizontal.map((element) =>
element.slice(1,6))` is creating an array of horizontal combinations from the `gameData.horizontal`
array. */
algoHorizontalStore.horizontalCombinations = gameData.horizontal.map((element) => element.slice(1, 6));

/* The `algorithmTopStore` object is used to store properties and arrays related to diagonal
combinations in the Connect Four game. */
const algorithmTopStore = {
  startRow: 0,
  endRow: 4,
  leftDiagonal: {
    combinations: [],
    start: 3,
    end: 6,
  },
  rightDiagonal: {
    combinations: [],
    start: 1,
    end: 4,
  },
  middleDiagonal: {
    leftCombinations: [],
    rightCombinations: [],
    left: 0,
    right : 6
  },
};

function getLeftDiagonalIndicesForRow(row) {
  return {
    start: algorithmTopStore.leftDiagonal.start - row,
    end: algorithmTopStore.leftDiagonal.end - row,
  };
}

function getRightDiagonalIndicesForRow(row) {
  return {
    start: algorithmTopStore.rightDiagonal.start + row,
    end: algorithmTopStore.rightDiagonal.end + row,
  };
}

function addIndices(b) {
  return algorithmTopStore.middleDiagonal.left + b; 
}
function subtractIndices(b) {
  return algorithmTopStore.middleDiagonal.right - b; 
}


function getMiddleDiagonalIndices(row, countingIndices) {
  return countingIndices(row);
}


function computeLeftDiagonalForRowAt(row) {
  const indices = getLeftDiagonalIndicesForRow(row);
  return gameData.horizontal[row].slice(indices.start, indices.end);
}

function computeRightDiagonalForRowAt(row) {
  const indices = getRightDiagonalIndicesForRow(row);
  return gameData.horizontal[row].slice(indices.start, indices.end);
}


function computeDiagonalTopCombinations() {
  algorithmTopStore.leftDiagonal.combinations = [];
  algorithmTopStore.rightDiagonal.combinations = [];
  algorithmTopStore.middleDiagonal.leftCombinations = [];
  algorithmTopStore.middleDiagonal.rightCombinations = [];
  for (let j = algorithmTopStore.startRow; j < algorithmTopStore.endRow; j++) {
      algorithmTopStore.leftDiagonal.combinations.push(computeLeftDiagonalForRowAt(j));
      algorithmTopStore.rightDiagonal.combinations.push(computeRightDiagonalForRowAt(j)); 
      algorithmTopStore.middleDiagonal.leftCombinations.push(gameData.horizontal[j][getMiddleDiagonalIndices(j, addIndices)]);
      algorithmTopStore.middleDiagonal.rightCombinations.push(gameData.horizontal[j][getMiddleDiagonalIndices(j, subtractIndices)]);
  }
}

computeDiagonalTopCombinations();