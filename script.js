const gameBoard = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const levelDisplay = document.getElementById("level-display");

const gridSize = 4;
let sequence = [];
let playerSequence = [];
let level = 1;

// Initialize the game board
function createGameBoard() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    gameBoard.appendChild(tile);
    tile.addEventListener("click", handleTileClick);
  }
}

// Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  levelDisplay.textContent = `Level: ${level}`;
  nextLevel();
}

// Advance to the next level
function nextLevel() {
  playerSequence = [];
  const nextTile = Math.floor(Math.random() * gridSize * gridSize);
  sequence.push(nextTile);
  levelDisplay.textContent = `Level: ${level}`;
  playSequence();
}

// Play the sequence for the player
function playSequence() {
  let delay = 500;
  sequence.forEach((tileIndex, i) => {
    setTimeout(() => {
      activateTile(tileIndex);
    }, delay * (i + 1));
  });
}

// Activate a tile visually
function activateTile(index) {
  const tile = gameBoard.querySelector(`[data-index='${index}']`);
  tile.classList.add("active");
  setTimeout(() => {
    tile.classList.remove("active");
  }, 300);
}

// Handle player clicking a tile
function handleTileClick(event) {
  const index = parseInt(event.target.dataset.index);
  playerSequence.push(index);
  checkPlayerMove();
}

// Check the player's move
function checkPlayerMove() {
  const currentMoveIndex = playerSequence.length - 1;
  if (playerSequence[currentMoveIndex] !== sequence[currentMoveIndex]) {
    alert("Game Over! You reached level " + level);
    startGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    level++;
    nextLevel();
  }
}

// Initialize the game
createGameBoard();
startButton.addEventListener("click", startGame);
