'use strict';

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(getRandomInt(0, 1000));
}

/*  bubble up highest value
[9,1,8,6,3,9,2,4,0,4,2,6,3] initial: 13 values
[1,8,6,3,9,2,4,0,4,2,6,3,9] after 1st pass, 12 comparisons, potentially 12 reassignments x 3 = 36
[1,6,3,8,2,4,0,4,2,6,3,9,9] after 2nd pass
[1,3,6,2,4,0,4,2,6,3,8,9,9] after 3rd pass
[1,3,2,4,0,4,2,6,3,6,8,9,9] after 4th pass, 9 x 3 = 27
[1,3,2,4,0,4,2,6,3,6,8,9,9] after 4th pass ... total is n(n+1)/2 X 3

with 1000 values, then n(n+1)/2 x 3 = 1000*1001/2*3 = 1.5 million possible reassignments

lowest down, highest up using indexes, and another array
reassignments would be 2, not 3 (no need for temp)

[9,1,8,6,3,9,2,4,0,4,2,6,3] initial: 13 values







*/





function bubbleSort (arr) {
  let lowestIndex = 0;
  let lowestValue = arr[lowestIndex];
  let highestIndex = arr.length;
  let highestValue = arr[highestIndex];
  let lastLoopIndex = arr.length - 2;


  for (let i = 1; i < lastLoopIndex; i++) {

  }


}

function mergeSort (arr) {

}

function binarySearch (arr, item) {

}

// Tests

const assert = require('assert');

function comparator (a, b) {
  if (Number(a) < Number(b)) return -1;
  if (Number(a) > Number(b)) return 1;
  return 0;
}

if (typeof describe === 'function') {
  describe('#bubbleSort()', () => {
    it('should sort array', () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#mergeSort()', () => {
    it('should sort array', () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#binarySearch()', () => {
    it('should return the index of given item if sorted array contains it', () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it('should return false if item not in sorted array', () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });
} else {
  console.log('Run the tests!');
}
