'use strict';

function Game () {
  this.board = new Board();

  this.start = function () {
    this.gameInPlay = true;
    this.board.createGrid();
    this.board.createCheckers();
    this.board.viewGrid();
  };

  this.removeChecker = function (row, col) {
    this.board.grid[row][col] = this.board.constructor.squareCss.open;
    this.board.checkers.pop();
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
    this.board.currentPlayer.pendingJump = false;
    this.board.viewGrid();
  };

  this.moveChecker = function (whichPiece, toWhere) {
    // Error Check -- Return if 'whichPiece' or 'toWhere' is not on the grid
    if (parseInt(whichPiece) < 0 || parseInt(whichPiece) > 77 ||
    parseInt(toWhere) < 0 || parseInt(toWhere) > 77) {
      console.log(`ERROR: Either ${whichPiece} or ${toWhere} is out of bounds.`);
      return;
    }
    // Determine grid coordinates
    const fromRow = parseInt(whichPiece / 10);
    const fromCol = whichPiece - fromRow * 10;
    const toRow = parseInt(toWhere / 10);
    const toCol = toWhere - toRow * 10;
    // Error Check -- Return if player does not have a checker at 'whichPiece'
    // or 'toWhere' not open
    if (this.board.grid[fromRow][fromCol] !== this.board.currentPlayer.checkerCss ||
    this.board.grid[toRow][toCol] !== this.board.constructor.squareCss.open) {
      console.log(`ERROR: Either your checker is not on ${whichPiece} or there is a checker on ${toWhere}.`);
      return;
    }
    // Process single move (no jumps) if move is valid
    // Verify that: checker moving in the correct direction,
    // both row & col are changed by 1, and player is not on an
    // extra move due to an additional available jump
    if (toRow - fromRow === this.board.currentPlayer.direction &&
    Math.abs(toCol - fromCol) === 1 &&
    this.board.currentPlayer.pendingJump === false) {
      this.removeChecker(fromRow, fromCol);
      this.addChecker(toRow, toCol);
      this.togglePlayer();
      return;
    }
    // The only remaining possible move is a jump.
    // Error Check -- Is it a valid move?
    const jumpRow = (toRow + fromRow) / 2;
    const jumpCol = (toCol + fromCol) / 2;
    if (toRow - fromRow !== this.board.currentPlayer.direction * 2 ||
    Math.abs(toCol - fromCol) !== 2 ||
    this.board.grid[jumpRow][jumpCol] !== this.board.currentPlayer.opponentCss) {
      console.log(`ERROR: Invalid move. No jump possible here.`);
      return;
    }
    // Process the jump
    this.removeChecker(fromRow, fromCol);
    this.addChecker(toRow, toCol);
    this.removeChecker(jumpRow, jumpCol);
    this.board.viewGrid();
    // After a jump the checker must be jumped again, if possible.
    // check to see if there is an available jump.
    const jumpToLeftRow = toRow + this.board.currentPlayer.direction * 2;
    const jumpToLeftCol = toCol - 2;
    const jumpToRightRow = jumpToLeftRow;
    const jumpToRightCol = toCol + 2;
    if (this.canJumpAgain(toRow, toCol, jumpToLeftRow, jumpToLeftCol) ||
    this.canJumpAgain(toRow, toCol, jumpToRightRow, jumpToRightCol)) {
      console.log(`There is another jump available for that checker. It is still ${this.board.currentPlayer.color}'s turn.`);
      this.board.currentPlayer.pendingJump = true;
      return;
    } else {
      this.togglePlayer();
      return;
    }
  };

  // This will verify that an additional jump can be made. Returns Booleen.
  // Will verify that and there is an opposing piece to be jumped and that
  // the destination square is open.
  this.canJumpAgain = function (fromRow, fromCol, toRow, toCol) {
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
      return false;
    }
    const row = (fromRow + toRow) / 2;
    const col = (fromCol + toCol) / 2;
    if (this.board.grid[row][col] === this.board.currentPlayer.opponentCss &&
    this.board.grid[toRow][toCol] === this.board.constructor.squareCss.open) {
      return true;
    }
    return false;
  };
}

function Board () {
  this.constructor = {
    name: 'Board',
    firstPlayer: {
      color: 'Blue',  // Must be synced with checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:blue; line-height:40px;',
      direction: 1,
      opponentCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;'
    },
    secondPlayer: {
      color: 'Red',  // Must be synced with checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;',
      direction: -1,
      opponentCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:blue; line-height:40px;'
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
  this.currentPlayer.pendingJump = false;

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
    console.clear();
    console.log('\n');
    console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.squareCss.corner, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label);
    for (let i = 0; i < 8; i++) {
      console.log(`%c${i}` + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[i][0], this.grid[i][1], this.grid[i][2], this.grid[i][3], this.grid[i][4], this.grid[i][5], this.grid[i][6], this.grid[i][7]);
    }
    console.log('\n');
    console.log(`Play instructions`);
    console.log(`${this.currentPlayer.color}'s turn.`);
  };
}

const game = new Game();
game.start();

function move (whichPiece, toWhere) {
  game.moveChecker(whichPiece, toWhere);
}

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
