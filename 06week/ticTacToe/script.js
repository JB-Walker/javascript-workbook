'use strict';

document.addEventListener('DOMContentLoaded', () => {
/*

  Initialize all game parameters
    current player = 'X'
    board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]
  Dsiplay user instructions

While game not won
  get user move (rowInput, colInput)

  validate legal move  - if (board[rowInput][colInput] === null)
    update memory       --- board[rowInput][colInput] = currentPlayer
    show move            ---   if rowInput = 0 && colInput = 0 then position = 0
                                           = 0 &&            1           = 1
                              data-cell-position. innerHTML = current player


    check for win
      if not won
        flip player   --- if 'X' then currentPlayer 'O', otherwise 'X'

      else (game won)
        break
    If game is draw, then
      break
END OF LOOP

Display game win information

---------------------------------








  update HTML that shows current board and solicits move













*/



});
