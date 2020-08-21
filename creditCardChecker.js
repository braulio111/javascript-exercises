
const sumDigits = (x, acc) => x + acc;
const transformDigit = (digit, position) => {
  let transformedDigit = digit;

  if (position % 2 === 1) {
    transformedDigit *= 2;
  }

  if (transformedDigit > 9) {
    transformedDigit -= 9;
  }

  return transformedDigit;
};

function creditCardChecker(cardNumber) {
  const summedDigits = cardNumber.reverse().map(transformDigit).reduce(sumDigits, 0);

  return summedDigits % 10 === 0;
}

module.exports = creditCardChecker;
