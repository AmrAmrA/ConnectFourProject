function getLastEmptyHole(column) {
  const holesArray = Array.from(column.children);
  return holesArray.findLast((element) => element.classList.contains("empty"));
}
function switchPlayer(currentPlayer) {
  return currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
}
function placeToken(hole, player) {
  hole.classList.remove("empty");
  hole.classList.add(player);
}

const columns = document.querySelectorAll(".column");
let currentPlayer = "playerOne";

for (const column of columns) {
  column.addEventListener("click", () => {
    const lastEmptyHole = getLastEmptyHole(column);
    if (lastEmptyHole) {
      placeToken(lastEmptyHole, currentPlayer);
      currentPlayer = switchPlayer(currentPlayer);
    }
  });
}