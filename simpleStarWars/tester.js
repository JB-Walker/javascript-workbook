function duplicateCount (text) {
  let characters = {};
  let count = 0;
  for (let char of text) {
    char.toLowerCase();
    if (!characters.hasOwnProperty(char)) {
      characters[char] = 1;
    } else if (characters[char] === 1) {
      characters[char] = 2;
      count++;
    }
  }
  return count;
}

console.log(duplicateCount(''));
console.log(duplicateCount('abcde'));
console.log(duplicateCount('aabbcde'));
console.log(duplicateCount('aabBcde'));
console.log(duplicateCount('Indivisibility'));
console.log(duplicateCount('Indivisibilities'));
