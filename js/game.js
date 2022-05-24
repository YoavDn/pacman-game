'use strict'

const EL_BOARD = document.querySelector('.board-container')
const EL_MODEL = document.querySelector('.modal')
const EL_MODEL_TXT = document.querySelector('.msg')

const El_SCORE = document.querySelector('h2 span')
const OVERLAY = document.querySelector('.overlay')

const WALL = '🟦'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '✴︎'
const CHERRY = '🍒'

var gCherryInterval
var gTimeout
var gBoard
var gGame = {
  score: 0,
  isOn: false,
  wonGame: false,
}
function init() {
  clearInterval(gCherryInterval)
  gBoard = buildBoard()
  gGame.foodOnBoard = countFoodOnBoard(gBoard)
  console.table(gBoard)

  createPacman(gBoard)
  createGhosts(gBoard)

  printMat(gBoard, '.board-container')
  gGame.isOn = true

  gCherryInterval = setInterval(placeCherry, 5000)
}

function buildBoard() {
  const SIZE = 10
  var board = []

  for (var i = 0; i < SIZE; i++) {
    board.push([])
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL
      }
    }
  }
  board[1][1] = SUPER_FOOD
  board[1][8] = SUPER_FOOD
  board[8][1] = SUPER_FOOD
  board[8][8] = SUPER_FOOD
  return board
}
function updateScore(diff = 0) {
  // TODO: update model and dom

  // Model
  gGame.score += diff

  // DOM
  El_SCORE.innerText = gGame.score
}

function gameOver() {
  EL_MODEL_TXT.innerText = gGame.wonGame ? 'You won' : 'You lost'
  EL_MODEL.classList.remove('hidden')
  OVERLAY.classList.remove('hidden')
  gGame.isOn = false
  // Some more stuff coming later
  gGhosts = []
  clearInterval(gIntervalGhosts)
}

function restartGame() {
  EL_MODEL.classList.add('hidden')
  OVERLAY.classList.add('hidden')

  gGame.score = 0
  gGame.wonGame = false
  updateScore()
  init()
}

function placeCherry() {
  var cell = findEmptyCell(gBoard)
  var cellValue = gBoard[cell.i][cell.j]
  gBoard[cell.i][cell.j] = CHERRY
  renderCell(cell, CHERRY)

  gTimeout = setTimeout(() => {
    gBoard[cell.i][cell.j] = cellValue
    renderCell(cell, cellValue)
  }, 5000)
}
