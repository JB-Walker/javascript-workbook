'use strict';

function Game () {
  this.gameInPlay = true;
  this.board = new Board();
  this.board.createGrid();

  this.start = function () {
    this.board.viewGrid();
  };





  this.moveChecker = function (whichPiece, toWhere) {
    // make sure move legal, flip player, adjust gameInPlay
  };
}

function Board () {
  this.grid = [];
  this.constructor = {
    name: 'Board',
    blueChecker: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:blue; line-height:40px;',
    redChecker: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;',
    openSquare: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:greenyellow; line-height:40px;',
    blackSquare: 'background-color:black; font-size:40px; padding:0px 12px; color:black; line-height:40px;',
    labelSquare: 'background-color:white; font-size:40px; padding:0px 12px; color:greenyellow; line-height:40px;',
    cornerSquare: 'background-color:white; font-size:40px; padding:0px 12px; color:white; line-height:40px;'
  };
  this.currentPlayer = 'Blue';
  this.currentChecker = this.constructor.blueChecker;


  // The createGrid function creates an 8x8 Checker Board array,
  // filled with alternating black and white squares.
  this.createGrid = function () {
    // A booleen flag is used to flip between colors.
    let flag = true;
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        if (flag) {
          this.grid[row].push(this.constructor.blackSquare);
          flag = !flag;
        } else {
          switch (true) {
            case row <= 2:
              this.grid[row].push(this.constructor.blueChecker);
              break;
            case row <= 4:
              this.grid[row].push(this.constructor.openSquare);
              break;
            default:
              this.grid[row].push(this.constructor.redChecker);
          }
          flag = !flag;
        }
      }
      flag = !flag;
    }
  };

  // prints out the board
  this.viewGrid = function () {
    console.log('\n');
    console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.cornerSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare);
    for (let i = 0; i < 8; i++) {
      console.log(`%c${i}` + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[i][0], this.grid[i][1], this.grid[i][2], this.grid[i][3], this.grid[i][4], this.grid[i][5], this.grid[i][6], this.grid[i][7]);
    }
    console.log('\n');
  };

  this.checkers = function () {
    // not sure what. is used in test
  };
}

const game = new Game();
game.start();
let fromSquare = {};
nullUserInputs();

function nullUserInputs () {
  fromSquare.row = null;
  fromSquare.col = null;
}

function toggleUser () {
  if (game.board.currentPlayer === 'Blue') {
    game.board.currentPlayer = 'Red';
    game.board.currentChecker = game.board.constructor.redChecker;
    console.log()
  } else {
    game.board.currentPlayer = 'Blue';
    game.board.currentChecker = game.board.constructor.blueChecker;
  }
}

function setInputs (pointer, rowColInput) {
  let row = parseInt(rowColInput / 10);
  let col = rowColInput - row * 10;
  console.log(`Row: ${row} Col: ${col}`);
  if (pointer === 'from' && row >= 0 && col >= 0 && row <= 7 && col <= 7 && game.board.grid[row][col] === game.board.currentChecker) {
    fromSquare.row = row;
    fromSquare.col = col;
    console.log(`Confirmation: Moving from Row:${fromSquare.row} Col:${fromSquare.col}`);
  } else if (pointer === 'to' && row >= 0 && col >= 0 && row <= 7 && col <= 7 && Math.abs(fromSquare.row - row) === 1 && Math.abs(fromSquare.col - col) === 1 && game.board.grid[row][col] === game.board.constructor.openSquare) {
    if (fromSquare.row) {
      game.board.grid[fromSquare.row][fromSquare.col] = game.board.constructor.openSquare;
      game.board.grid[row][col] = game.board.currentChecker;
      console.log(`Confirmation: Moved to open cell, Row:${row} Col:${col}`);
      nullUserInputs();
      game.board.viewGrid();
      toggleUser();
    }
  }
}

function from (consoleInput) {
  setInputs('from', consoleInput);
}

function to (consoleInput) {
  setInputs('to', consoleInput);
}

/*
console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.cornerSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare, this.constructor.labelSquare);
console.log('%c0' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[0][0], this.grid[0][1], this.grid[0][2], this.grid[0][3], this.grid[0][4], this.grid[0][5], this.grid[0][6], this.grid[0][7]);
console.log('%c1' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[1][0], this.grid[1][1], this.grid[1][2], this.grid[1][3], this.grid[1][4], this.grid[1][5], this.grid[1][6], this.grid[1][7]);
console.log('%c2' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[2][0], this.grid[2][1], this.grid[2][2], this.grid[2][3], this.grid[2][4], this.grid[2][5], this.grid[2][6], this.grid[2][7]);
console.log('%c3' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[3][0], this.grid[3][1], this.grid[3][2], this.grid[3][3], this.grid[3][4], this.grid[3][5], this.grid[3][6], this.grid[3][7]);
console.log('%c4' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[4][0], this.grid[4][1], this.grid[4][2], this.grid[4][3], this.grid[4][4], this.grid[4][5], this.grid[4][6], this.grid[4][7]);
console.log('%c5' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[5][0], this.grid[5][1], this.grid[5][2], this.grid[5][3], this.grid[5][4], this.grid[5][5], this.grid[5][6], this.grid[5][7]);
console.log('%c6' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[6][0], this.grid[6][1], this.grid[6][2], this.grid[6][3], this.grid[6][4], this.grid[6][5], this.grid[6][6], this.grid[6][7]);
console.log('%c7' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.labelSquare, this.grid[7][0], this.grid[7][1], this.grid[7][2], this.grid[7][3], this.grid[7][4], this.grid[7][5], this.grid[7][6], this.grid[7][7]);
console.log('\n');

  console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', corner, label, label, label, label, label, label, label, label);
  console.log('%c0' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, black, blue, black, blue, black, blue, black, blue);
  console.log('%c1' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, blue, black, blue, black, blue, black, blue, black);
  console.log('%c2' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, black, blue, black, blue, black, blue, black, blue);
  console.log('%c3' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, open, black, open, black, open, black, open, black);
  console.log('%c4' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, black, open, black, open, black, open, black, open);
  console.log('%c5' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, red, black, red, black, red, black, red, black);
  console.log('%c6' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, black, red, black, red, black, red, black, red);
  console.log('%c7' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', label, red, black, red, black, red, black, red, black);

const grid = [
  [black, blue, black, blue, black, blue, black, blue],
  [blue, black, blue, black, blue, black, blue, black],
  [black, blue, black, blue, black, blue, black, blue],
  [open, black, open, black, open, black, open, black],
  [black, open, black, open, black, open, black, open],
  [red, black, red, black, red, black, red, black],
  [black, red, black, red, black, red, black, red],
  [red, black, red, black, red, black, red, black]
];
*/

// Tests
/*******
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}
*******/
