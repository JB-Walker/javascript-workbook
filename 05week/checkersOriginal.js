'use strict';

// Console Checkers for Two Players
// This is a simplified version of checkers, which is played in the browser's
// console. In this game, there are no kings and players are not required
// to jump an opponent's checker if there is an alternative move (non-jump)
// available. However, if a player jumps once and that checker has additional
// jumps available, the player must either execute the next available jump or
// execute a jump with another checker. If this second checker has additional
// jumps available, then the same rules apply, and so on.

// Javascript programs may not seek user input from the console, so a work
// around has been used. Players submit their inputs in the form of "move(x,y)"
// which in actuality is a command to execute the move function with x and y
// arguments. The game design waits the players to call its move function,
// much the same as an event-driven game awaits user-generated events.

function Game () {
  this.board = new Board();

  this.start = function () {
    this.gameInPlay = true;
    this.board.createGrid();
    this.board.viewGrid();
  };

  // This removes a checker from the board. It is used a player makes a move
  // from one square to another and when an opposing player's checker is jumped.
  this.removeChecker = function (row, col) {
    this.board.grid[row][col] = this.board.constructor.squareCss.open;
    this.board.checkers.pop();
  };

  // This is used to add a player's checker to the board when it is moved.
  this.addChecker = function (row, col) {
    this.board.grid[row][col] = this.board.currentPlayer.checkerCss;
    this.board.checkers.push('placeHolder');
  };

  // After the completion of a turn, this is used to flip between the two
  // players. The currentPlayer object's color value is compared. Then the
  // currentPlayer is changed by making a clone of the constructor object.
  this.togglePlayer = function () {
    if (this.board.currentPlayer.color === this.board.constructor.firstPlayer.color) {
      this.board.currentPlayer = {...this.board.constructor.secondPlayer};
    } else {
      this.board.currentPlayer = {...this.board.constructor.firstPlayer};
    }
    // the pendingJump value must be added after currentPlayer is cloned
    this.board.currentPlayer.pendingJump = false;
    // Finally, the board is cleared and re-rendered.
    this.board.viewGrid();
  };

  // This function facilitates the movement of the checkers.
  // Validation that the move is permissible: correct color checker, Moving
  // in correct direction, the correct distance, that the space being Moved
  // to is vacant. If a jump is being made, confirms that an opponent's checker
  // is correctly positioned to be jumped. If a jump has been made and
  // a second move is possible, ensuring that the second move is a jump.
  this.moveChecker = function (whichPiece, toWhere) {
    // Error Check -- Exit if 'whichPiece' or 'toWhere' is not on the grid
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
    if (toRow - fromRow === this.board.currentPlayer.rowOffset &&
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
    if (toRow - fromRow !== this.board.currentPlayer.rowOffset * 2 ||
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
    // First, the 2 row-col grid positions of where the checker must be
    // jumped to are determined.
    const jumpToLeftRow = toRow + this.board.currentPlayer.rowOffset * 2;
    const jumpToLeftCol = toCol - 2;
    const jumpToRightRow = jumpToLeftRow;
    const jumpToRightCol = toCol + 2;
    // Then these positions are sent to canJumpAgain to determine if either
    // one is would be a valid second jump.
    if (this.canJumpAgain(toRow, toCol, jumpToLeftRow, jumpToLeftCol) ||
    this.canJumpAgain(toRow, toCol, jumpToRightRow, jumpToRightCol)) {
      // A second jump is available, so a message is written to the console
      // and pendingJump is set to true to prevent the player's next move from
      // being a non-jump.
      console.log(`There is another jump available for that checker. It is still ${this.board.currentPlayer.color}'s turn.`);
      return;
    } else {
      // No more jumps are available, so flip player
      this.togglePlayer();
      return;
    }
  };

  // This will verify that an additional jump can be made. Returns Booleen.
  // Will verify that and there is an opposing piece to be jumped and that
  // the destination square is open. pendingJump must also be set to true
  // to prevent the player from making a non-jump second move.
  this.canJumpAgain = function (fromRow, fromCol, toRow, toCol) {
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
      return false;
    }
    const row = (fromRow + toRow) / 2;
    const col = (fromCol + toCol) / 2;
    if (this.board.grid[row][col] === this.board.currentPlayer.opponentCss &&
    this.board.grid[toRow][toCol] === this.board.constructor.squareCss.open) {
      this.board.currentPlayer.pendingJump = true;
      return true;
    }
    this.board.currentPlayer.pendingJump = false;
    return false;
  };
}

// Due to the limited capability to render elements and css properties in the
// console via the console.log() method, the checkerboard is actually an 8x8
// grid of circles, unicode 25cf. These circles are then styled through CSS to
// appear as squares on a checkerboard in the various states:
//
// Black square: black circle with a black background
// Empty playable square: greenyellow circle on a greenyellow background
// Checker on a playable square: Red or Blue circle on a greenyellow background.
//
// The 8x8 grid is a 2-dimensional array holding the CSS values for the 'square'
//
//
function Board () {
  this.constructor = {
    name: 'Board',
    firstPlayer: {
      color: 'Blue',  // Must be synced with checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:blue; line-height:40px;',
      rowOffset: 1,   // Blue checkers move down - row value increases 1 for normal move
      opponentCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;'
    },
    secondPlayer: {
      color: 'Red',   // Must be synced with checkerCss's color value
      checkerCss: 'background-color:greenyellow; font-size:40px; padding:0px 12px; color:red; line-height:40px;',
      rowOffset: -1,  // Red checkers move up - row value decreases -1 for normal move
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
  // Checkers holds 1 element per checker on the board. It is unneeded, but
  // was required for testing, so it is filled with placeHolders.
  this.checkers = Array(24).fill(0).map((e, i) => 'placeholder');
  // Clone object using ES6
  this.currentPlayer = {...this.constructor.firstPlayer};
  // If another jump is available after a jump this flag set to true. Enables
  // the same player to get multiples plays on the same turn.
  this.currentPlayer.pendingJump = false;

  // The createGrid function creates an 8x8 Checker Board array, filled with
  // the CSS needed to render the board in viewGrid()
  this.createGrid = function () {
    // A booleen flag is used to flip between playable & non-Playable squares.
    let flag = true;
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        if (flag) {
          // Non-playable square
          this.grid[row].push(this.constructor.squareCss.black);
          flag = !flag;
        } else {
          switch (true) {
            case row <= 2:
              // Playable square. firstPlayer's checker.
              this.grid[row].push(this.constructor.firstPlayer.checkerCss);
              break;
            case row <= 4:
              // Playable square. No checker.
              this.grid[row].push(this.constructor.squareCss.open);
              break;
            default:
              // Playable square. secondPlayer's checker.
              this.grid[row].push(this.constructor.secondPlayer.checkerCss);
          }
          flag = !flag;
        }
      }
      flag = !flag;
    }
  };

  // In the console.log() method, the special symbol '%c' indicates that CSS
  // is used for this entity (string/variable/symbol). Limitations of the
  // method make it necessary to write out each entity.
  this.viewGrid = function () {
    console.clear();
    console.log('\n');
    console.log('%cC' + '%c0' + '%c1' + '%c2' + '%c3' + '%c4' + '%c5' + '%c6' + '%c7', this.constructor.squareCss.corner, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label, this.constructor.squareCss.label);
    for (let i = 0; i < 8; i++) {
      console.log(`%c${i}` + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf' + '%c\u25cf', this.constructor.squareCss.label, this.grid[i][0], this.grid[i][1], this.grid[i][2], this.grid[i][3], this.grid[i][4], this.grid[i][5], this.grid[i][6], this.grid[i][7]);
    }
    console.log('\n');
    console.log(`%cInstructions: ` + `%center checker movements by typing: move(xy,ab)`, `font-size:150%; font-weight:bold;`, `font-size:125%;`);
    console.log(`%cWhere 'xy' is the checker's current row-col position and 'ab' is its destination.`, `font-size:125%;`);
    console.log(`%cExample: move(21,32)  Subsequent moves are more easily entered using the up arrow key & editing.`, `font-size:125%;`);
    console.log('\n');
    console.log(`%c${this.currentPlayer.color}'s turn.`, `font-size:125%;`);
  };
}

// This function simply acts as a pointer. It is used to reduce the amount of
// typing that players must make each turn and helps to encapsulate the code.
function move (whichPiece, toWhere) {
  game.moveChecker(whichPiece, toWhere);
}

const game = new Game();
game.start();

// Tests
/***** CAN NOT BE USED (with ease) DUE TO PRESENCE OF ES6 STATEMENTS
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt () {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe ('Game.moveChecker()', function () {
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
*****/
