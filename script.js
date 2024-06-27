const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const gridSizeElement = document.getElementById("gridSize");
const startGameButton = document.getElementById("startGame");

let gridSize = 3;
let board = [];
let currentPlayer = "X";

function createBoard(size) {
  board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  boardElement.style.gridTemplateColumns = `repeat(${size}, 60px)`;
  boardElement.innerHTML = "";
  s;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);
    }
  }
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  if (board[row][col]) return;

  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner(row, col)) {
    messageElement.textContent = `Player ${currentPlayer} wins!`;
    disableBoard();
  } else if (board.flat().every((cell) => cell)) {
    messageElement.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

function checkWinner(row, col) {
  row = parseInt(row);
  col = parseInt(col);
  const size = board.length;

  return (
    board[row].every((cell) => cell === currentPlayer) ||
    board.every((row) => row[col] === currentPlayer) ||
    (row === col && board.every((row, i) => row[i] === currentPlayer)) ||
    (row + col === size - 1 &&
      board.every((row, i) => row[size - 1 - i] === currentPlayer))
  );
}

startGameButton.addEventListener("click", () => {
  gridSize = parseInt(gridSizeElement.value);
  currentPlayer = "X";
  createBoard(gridSize);
});

createBoard(gridSize);
