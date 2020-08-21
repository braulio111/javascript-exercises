const creditCardChecker = require('./creditCardChecker');

function findInvalid(cards) {
  return cards.filter(card => !creditCardChecker(card));
};

module.exports = findInvalid;
