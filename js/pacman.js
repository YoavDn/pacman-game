'use strict';

var gPacDir = 'left';
var PACMAN = `<img class="pacman ${gPacDir}"src="imgs/pacman.png" />`;

var gPacman;
function createPacman(board) {
  // TODO
  gPacman = {
    location: { i: 5, j: 7 },
    isSuper: false,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  // TODO: use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);

  // TODO: return if cannot move
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;

  // TODO: hitting a ghost?  call gameOver

  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      gGhostKilled++;

      var ghostsIdx = findGhostIdx(gGhosts, nextLocation);
      gKilledGhosts.push(gGhosts[ghostsIdx]);

      gGhosts.splice(ghostsIdx, 1);

      setTimeout(() => {
        createGhosts(gBoard, gGhostKilled);
      }, 5000);
      console.log(gKilledGhosts);
      console.log(gGhosts, 'new ghost');
      pacmanKill(nextLocation);
      return;
    }
    gameOver();
    return;
  }

  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    gPacman.isSuper = true;
    setTimeout(() => (gPacman.isSuper = false), 5000);
    // attackMode()
  }

  // TODO: moving from corrent position:
  // TODO: update the model
  if (nextCell === FOOD) {
    updateScore(1);
    gGame.foodOnBoard = countFoodOnBoard(gBoard);
  }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  if (nextCell === CHERRY) {
    updateScore(15);
    clearTimeout(gTimeout);
    clearInterval(gCherryInterval);
    gCherryInterval = setInterval(placeCherry, 5000);
  }
  // check win
  if (gGame.foodOnBoard === 0) {
    gGame.wonGame = true;
    gameOver();
  }

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);

  // TODO: Move the pacman to new location
  // TODO: update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // TODO: update the DOM
  renderCell(gPacman.location, PACMAN);
}
function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  // TODO: figure out nextLocation
  switch (ev.code) {
    case 'ArrowUp':
      nextLocation.i--;
      gPacDir = 'up';
      updatePacmanDir();
      break;

    case 'ArrowDown':
      nextLocation.i++;
      gPacDir = 'down';
      updatePacmanDir();
      break;

    case 'ArrowLeft':
      nextLocation.j--;
      gPacDir = 'left';
      updatePacmanDir();
      break;

    case 'ArrowRight':
      nextLocation.j++;
      gPacDir = 'right';
      updatePacmanDir();

      break;
  }
  return nextLocation;
}

function pacmanKill(pos) {
  //Model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  gBoard[pos.i][pos.j] = PACMAN;

  //Dom
  renderCell(gPacman.location, EMPTY);
  // renderCell(pos, PACMAN);
  gPacman.location = pos;
  renderCell(gPacman.location, PACMAN);
}

function updatePacmanDir() {
  PACMAN = `<img class="pacman ${gPacDir}"src="imgs/pacman.png" />`;
}
