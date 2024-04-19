let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let singlePlayerMode = true; // Change to false for two-player mode

function playMove(index) {
  if (board[index] === '' && !isGameOver()) {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].textContent = currentPlayer;
    if (isGameOver()) {
      document.getElementById('status').textContent = checkWinner() ? `${checkWinner()} wins!` : 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (singlePlayerMode && currentPlayer === 'O') {
        makeAIMove();
      }
    }
  }
}

function undoMove() {
  const lastMoveIndex = board.lastIndexOf('X') !== -1 ? board.lastIndexOf('X') : board.lastIndexOf('O');
  if (lastMoveIndex !== -1) {
    board[lastMoveIndex] = '';
    document.getElementById('board').children[lastMoveIndex].textContent = '';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function isGameOver() {
  return checkWinner() || board.every(cell => cell !== '');
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function makeAIMove() {
  // Basic AI - Randomly choose an empty cell
  const emptyCells = board.reduce((acc, cell, index) => cell === '' ? [...acc, index] : acc, []);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  playMove(emptyCells[randomIndex]);
}

document.getElementById("refresh-btn").addEventListener("click", function() {
    // Reload the webpage
    location.reload();
});