document.addEventListener('DOMContentLoaded', startGame)

// To do:

// Reset the Board
// ------> After a win or loss, give players a chance to try again by resetting the board to its default state. You'll need to put classes back the way they were at the start, and re-initialize the global board object.

// Sound Effects
// -----> nvestigate how to use JavaScript to play a sound when the user uncovers or marks a cell. Play an explosion when they uncover a bomb, and applause when they win. (There's a resourse on the foundations repo FYI)




// Define your `board` object here!

var board = {}
board.cells = []

function makeBoard (numberOfSquares) {
  for (r = 0; r < numberOfSquares; r++) {
    for (c = 0; c < numberOfSquares; c++)
      board.cells.push({
        row: r,
        col: c,
        isMine: Math.random() >= 0.7,
        isMarked: false,
        hidden: true
      })
    }
}

function startGame () {
  makeBoard(6);
  lib.initBoard()

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
}



function explosion () {
  let bomb = new Audio("audio/explosion.mp3")
  
  for (var i = 0; i < board.cells.length; i++){
    if((board.cells[i].isMine && !board.cells[i].hidden)){
      bomb.play();
    }
  }
}
document.addEventListener("click", explosion)



// This Function checks for a win condition:
function checkForWin () {
  let applauseSound = new Audio("audio/applause.mp3");

  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return
    }
  }
  lib.displayMessage('You win!')
  applauseSound.play();
}

// Define this function to count the number of mines around the cell (there could be as many as 8). You don't have to get the surrounding cells yourself! Just use `lib.getSurroundingCells`: var surrounding = lib.getSurroundingCells(cell.row, cell.col)
// It will return cell objects in an array. You should loop through them, counting the number of times `cell.isMine` is true.


function countSurroundingMines (cell) {
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let totalMines = 0;
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      totalMines++
    }
  }
  return totalMines
}


function restart () {
  document.location.reload();
}

