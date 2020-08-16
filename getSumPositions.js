
function getSumPositions(numbers, result) {
  const map = {};

  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const goalNumber = result - currentNumber;

    map[currentNumber] = i;

    if (map[goalNumber]) {
      return[i, map[goalNumber]]
    }
  }
}

console.log(getSumPositions([2, 5, 7, 8, 10, 11, 34, 34, 35, 35, 35, 35, 35], 18)) // [0, 2]
