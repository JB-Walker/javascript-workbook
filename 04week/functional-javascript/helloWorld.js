'use strict';

// These are various function exercises. The assigned goal was to get them
// to work. My goal is to get them to work using a single ES6 instruction.

// Return in uppercase
function upperCaser (input) {
  return input.toUpperCase();
}
module.exports = upperCaser;

// Invoke a function a given number of times
// This function works but not as 1 ES6 instruction !!!!!!!!!!!!!!!!!!!!!!
function repeat (operation, num) {
  for (let i = 0; i < num; i++) {
    operation();
  }
}
module.exports = repeat;

// Return an array whose elements are twice the input
function doubleAll (numbers) {
  return numbers.map(x => x * 2);
}
module.exports = doubleAll;

// Filter an array of opjects, returning only the .message properties that are less than 50 characters
function getShortMessages (messages) {
  return messages.map(x => x.message).filter(y => y.length < 50);
}
module.exports = getShortMessages;

// Return a boolean test function that verifies that all submitted users are goodusers
function checkUsersValid (goodUsers) {
  return function allUsersValid (submittedUsers) {
    submittedUsers.every(isValidUser);

    function isValidUser (element) {
      return goodUsers.some(element);
    }
  };
}
module.exports = checkUsersValid;
