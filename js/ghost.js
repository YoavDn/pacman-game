'use strict';
var GHOST = ghostSvg();
var gGhosts = [];
var gIntervalGhosts;
var gKilledGhosts = [];
var gGhostKilled = 0;

function createGhost(board) {
  // TODO
  var ghost = {
    location: { i: 3, j: 3 },
    currCellContents: FOOD,
    ghostColor: getRandomColor(),
  };
  gGhosts.push(ghost);
  GHOST = ghostSvg(ghost.ghostColor);
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board, gk = 3) {
  gGhostKilled = 0;
  clearInterval(gIntervalGhosts);
  // TODO: 3 ghosts and an interval
  for (var i = 0; i < gk; i++) {
    createGhost(board);
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
  // TODO: loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}
function moveGhost(ghost) {
  // TODO: figure out moveDiff, nextLocation, nextCell

  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // TODO: return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;

  // TODO: hitting a pacman?  call gameOver
  if (nextCell === PACMAN) {
    if (gPacman.isSuper) return;
    gameOver();
    return;
  }

  // TODO: moving from current position:
  // TODO: update the model

  // Restore the prev cell contents
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContents;

  // TODO: update the DOM
  renderCell(ghost.location, ghost.currCellContents);

  // TODO: Move the ghost to new location
  // TODO: update the model

  // Save the new cell contents so we can restore later
  ghost.currCellContents = gBoard[nextLocation.i][nextLocation.j];

  ghost.location = nextLocation;
  gBoard[nextLocation.i][nextLocation.j] = GHOST;

  // TODO: update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(1, 100);

  if (randNum <= 25) {
    return { i: 0, j: 1 };
  } else if (randNum <= 50) {
    return { i: -1, j: 0 };
  } else if (randNum <= 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}
function getGhostHTML(ghost) {
  var color = gPacman.isSuper ? 'blue' : ghost.ghostColor;
  return `<span style="color:${color}" >${ghostSvg(color)}</span>`;
}

function killedGhost(pos) {}

// function reviveGhosts() {
//   for (var i = 0; i < gKilledGhosts.length; i++) {
//     gGhosts.push(gKilledGhosts[i]);
//   }
//   console.log('hellow');
// }
