const creditCardChecker = require('./creditCardChecker');

function findInvalid(cards) {
  return cards.filter(card => !creditCardChecker(card));
};

console.log(findInvalid(cards));
module.exports = findInvalid;
