'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const masterMind = new MasterMind();
  masterMind.startGame();
});

/*************************************************
*** This class simulates a game of Mastermind. ***
**************************************************/

class MasterMind {
  constructor () {
    // All Global Constants
    this.codeLength = 4;
    this.maxChecks = 10;
    this.colorCount = 8;
    // All Global Variables - reset with each new game in processStart()
    this.currentRow = null;
    this.currentCol = null;
    this.guess = null;
    this.solution = null;
  }

  startGame () {
    this.renderPalette();
    this.renderBoard();
    this.renderButtons();
    this.processStart();
  }

  renderPalette () {
    const palette = document.createElement('div');
    palette.setAttribute('id', 'palette');
    for (let colorCode = 0; colorCode < this.colorCount; colorCode++) {
      const colorCell = document.createElement('div');
      colorCell.dataset.color = colorCode;
      colorCell.className = 'paletteCell';
      colorCell.addEventListener('click', (selectedColor) => {
        this.insertPeg(selectedColor);
      });
      palette.appendChild(colorCell);
    }
    document.body.appendChild(palette);
  }

  renderBoard () {
    const board = document.createElement('table');
    board.setAttribute('id', 'board');
    for (let row = 0; row < this.maxChecks; row++) {
      const newRow = document.createElement('tr');
      for (let col = 0; col <= this.codeLength; col++) {
        const newCol = document.createElement('td');
        newCol.setAttribute('id', `row${row}col${col}`);
        newCol.setAttribute('class', 'peg');
        newCol.dataset.color = this.colorCount;
        newRow.appendChild(newCol);
      }
      board.appendChild(newRow);
    }
    document.body.appendChild(board);
  }

  insertPeg (selectedColor) {
    if (this.currentCol < this.codeLength) {
      const pegPosition = document.getElementById(`row${this.currentRow}col${this.currentCol}`);
      pegPosition.dataset.color = selectedColor.target.dataset.color;
      this.guess.push(parseInt(selectedColor.target.dataset.color));
      this.currentCol++;
    }
  }

  renderButtons () {
    // Button Container
    const buttons = document.createElement('div');
    buttons.setAttribute('id', 'buttons');
    // Start Button
    const start = document.createElement('button');
    start.setAttribute('id', 'start');
    start.innerHTML = 'NEW GAME';
    start.addEventListener('click', () => {
      this.processStart();
    });
    buttons.appendChild(start);
    // Clear Button
    const clear = document.createElement('button');
    clear.setAttribute('id', 'start');
    clear.innerHTML = 'CLEAR';
    clear.addEventListener('click', () => {
      this.processClear();
    });
    buttons.appendChild(clear);
    // Check Button
    const check = document.createElement('button');
    check.setAttribute('id', 'start');
    check.innerHTML = 'CHECK';
    check.addEventListener('click', () => {
      this.processCheck();
    });
    buttons.appendChild(check);
    // Append button container to Body
    document.body.appendChild(buttons);
  }

  processStart () {
    // Clear board on restart - not first game
    if (this.currentRow !== null) {
      for (let row = 0; row < this.maxChecks; row++) {
        for (let col = 0; col < this.codeLength; col++) {
          const currentCell = document.getElementById(`row${row}col${col}`);
          currentCell.dataset.color = this.colorCount;
        }
        const currentCell = document.getElementById(`row${row}col${this.codeLength}`);
        currentCell.innerHTML = '';
      }
    }
    // Initialize variables that change with each game
    // currentRow decendes to 0
    this.currentRow = this.maxChecks - 1;
    this.currentCol = 0;
    // guess[] and solution[] contain numbers which represent colors
    this.guess = [];
    this.solution = [];
    for (let i = 0; i < this.codeLength; i++) {
      this.solution.push(Math.floor(Math.random() * this.colorCount));
    }
  }

  processClear () {
    this.guess = [];
    this.currentCol = 0;
    // Color #colorCount is gray, the color of an empty board
    for (let col = 0; col < this.codeLength; col++) {
      const currentCell = document.getElementById(`row${this.currentRow}col${col}`);
      currentCell.dataset.color = this.colorCount;
    }
  }

  //  processCheck is used to compare the guess to the solution. A copy of
  //  the solution is made, so that its elements can be crossed off as matches
  //  are found. As matches are found, the relevant elements are replaced with
  //  special symbols 'nullSolution' and 'nullGuess', so that those elements
  //  can not be used in subsequent element comparisons. They must be different
  //  from the color codes and each other.
  processCheck () {
    if (this.currentCol === this.codeLength && this.currentRow >= 0) {
      let exactMatch = 0;
      let correctColor = 0;
      // Determines number of colors in the guess that are in the correct position.
      const solutionCopy = this.solution.slice();
      for (let mutualIndex = 0; mutualIndex < this.codeLength; mutualIndex++) {
        if (this.guess[mutualIndex] === solutionCopy[mutualIndex]) {
          exactMatch++;
          solutionCopy[mutualIndex] = 'nullSolution';
          this.guess[mutualIndex] = 'nullGuess';
        }
      }
      // Determines remaining number of colors in the guess that match remaining
      // colors in the solution
      for (let guessIndex = 0; guessIndex < this.codeLength; guessIndex++) {
        for (let solutionIndex = 0; solutionIndex < this.codeLength; solutionIndex++) {
          if (this.guess[guessIndex] === solutionCopy[solutionIndex]) {
            correctColor++;
            solutionCopy[solutionIndex] = 'nullSolution';
            this.guess[guessIndex] = 'nullGuess';
          }
        }
      }
      const answerCell = document.getElementById(`row${this.currentRow}col${this.codeLength}`);
      answerCell.innerHTML = `${exactMatch}-${correctColor}`;
      this.currentCol = 0;
      this.currentRow--;
      this.guess = [];
      if (exactMatch === 4) {
        window.alert(`Congratulations! You won in ${this.maxChecks - this.currentRow - 1} moves.`);
      } else if (this.currentRow === -1) {
        // Player Lost Reveal Solution
      }
    }
  }
}
