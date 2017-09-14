'use strict';

function Game () {
  this.board = new Board();

  this.start = function () {
    this.gameInPlay = true;
    this.board.createGrid();
    this.board.createCheckers();
    console.clear();
    this.board.viewGrid();
    console.log(`Play instructions`);
    console.log(`${this.board.currentPlayer.color}'s turn.`);
  };

  this.removeChecker = function (row, col) {
    this.board.grid[row][col] = this.board.constructor.squareCss.open;
    this.board.checkers.pop;
  };

  this.addChecker = function (row, col) {
    this.board.grid[row][col] = this.board.currentPlayer.checkerCss;
    this.board.checkers.push('placeHolder');
  };

  this.togglePlayer = function () {
    if (this.board.currentPlayer.color === this.board.constructor.firstPlayer.color) {
      this.board.currentPlayer = {...this.board.constructor.secondPlayer};
    } else {
      this.board.currentPlayer = {...this.board.constructor.firstPlayer};
    }
    console.clear();
    this.board.viewGrid();
    console.log(`Play instructions`);
    console.log(`${this.board.currentPlayer.color}'s turn.`);
  };

  this.moveChecker = function (whichPiece, toWhere) {
    if (parseInt(whichPiece) >= 0 && parseInt(whichPiece) <= 77 && parseInt(toWhere) >= 0 && parseInt(toWhere) <= 77) {
      const fromRow = parseInt(whichPiece / 10);
      const fromCol = whichPiece - fromRow * 10;
      const toRow = parseInt(toWhere / 10);
      const toCol = toWhere - toRow * 10;
      debugger
      if (this.board.grid[fromRow][fromCol] === this.board.currentPlayer.checkerCss && this.board.grid[toRow][toCol] === this.board.constructor.squareCss.open) {
        switch (true) {
          // Either player moves a checker into an open square
          case toRow - fromRow === this.board.currentPlayer.direction && Math.abs(toCol - fromCol) === 1:
            this.removeChecker(fromRow, fromCol);
            this.addChecker(toRow, toCol);
            this.togglePlayer();
            break;
        }
      } else { console.log(`ERROR: Either your checker is not on ${whichPiece} or there is a checker on ${toWhere}. Player ${this.board.currentPlayer.color}, please submit a valid move.`); }
    } else { console.log(`ERROR: Either ${whichPiece} or ${toWhere} is out of bounds. Player ${this.board.currentPlayer.color}, please submit a valid move.`); }
  };
}

function Board () {
  this.constructor = {
    name: 'Board',
    firstPlayer: {
      color: 'Blue',  // Must be synced with firstPlayer.checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:blue; line-height:40px;',
      direction: 1
    },
    secondPlayer: {
      color: 'Red',  // Must be synced with secondPlayer.checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;',
      direction: -1
    },
    squareCss: {
      open: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:greenyellow; line-height:40px;',
      black: 'background-color:black; font-size:40px; padding:0px 12px; color:black; line-height:40px;',
      label: 'background-color:white; font-size:40px; padding:0px 12px; color:greenyellow; line-height:40px;',
      corner: 'background-color:white; font-size:40px; padding:0px 12px; color:white; line-height:40px;'
    }
  };
  this.grid = [];
  this.checkers = [];
  this.currentPlayer = {...this.constructor.firstPlayer};

  this.createCheckers = function () {
    for (let i = 0; i < 24; i++) {
      this.checkers.push('placeHolder');
    }
  };

  // The createGrid function creates an 8x8 Checker Board array,
  // filled with alternating black and white squares.
  this.createGrid = function () {
    // @@@@@@@@@@@@@ make below consoleGrid & create 2nd grid for normal program
    // A booleen flag is used to flip between colors.
    let flag = true;
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        if (flag) {
          this.grid[row].push(this.constructor.squareCss.black);
          flag = !flag;
        } else {
          switch (true) {
            case row <= 2:
              this.grid[row].push(this.constructor.firstPlayer.checkerCss);
              break;
            case row <= 4:
              this.grid[row].push(this.constructor.squareCss.open);
              break;
            default:
              this.grid[row].push(this.constructor.secondPlayer.checkerCss);
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
    console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.squareCss.corner, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label);
    for (let i = 0; i < 8; i++) {
      console.log(`%c${i}` + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[i][0], this.grid[i][1], this.grid[i][2], this.grid[i][3], this.grid[i][4], this.grid[i][5], this.grid[i][6], this.grid[i][7]);
    }
    console.log('\n');
  };
}

const game = new Game();
game.start();

function move (whichPiece, toWhere) {
  game.moveChecker(whichPiece, toWhere);
}

/*
console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.squareCss.corner, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label);
console.log('%c0' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[0][0], this.grid[0][1], this.grid[0][2], this.grid[0][3], this.grid[0][4], this.grid[0][5], this.grid[0][6], this.grid[0][7]);
console.log('%c1' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[1][0], this.grid[1][1], this.grid[1][2], this.grid[1][3], this.grid[1][4], this.grid[1][5], this.grid[1][6], this.grid[1][7]);
console.log('%c2' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[2][0], this.grid[2][1], this.grid[2][2], this.grid[2][3], this.grid[2][4], this.grid[2][5], this.grid[2][6], this.grid[2][7]);
console.log('%c3' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[3][0], this.grid[3][1], this.grid[3][2], this.grid[3][3], this.grid[3][4], this.grid[3][5], this.grid[3][6], this.grid[3][7]);
console.log('%c4' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[4][0], this.grid[4][1], this.grid[4][2], this.grid[4][3], this.grid[4][4], this.grid[4][5], this.grid[4][6], this.grid[4][7]);
console.log('%c5' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[5][0], this.grid[5][1], this.grid[5][2], this.grid[5][3], this.grid[5][4], this.grid[5][5], this.grid[5][6], this.grid[5][7]);
console.log('%c6' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[6][0], this.grid[6][1], this.grid[6][2], this.grid[6][3], this.grid[6][4], this.grid[6][5], this.grid[6][6], this.grid[6][7]);
console.log('%c7' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[7][0], this.grid[7][1], this.grid[7][2], this.grid[7][3], this.grid[7][4], this.grid[7][5], this.grid[7][6], this.grid[7][7]);
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
