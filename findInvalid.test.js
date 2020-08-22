const findInvalid = require('./findInvalid');

const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];

// // All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];

describe('findInvalid', () => {
  it('should return invalid cards when given multiple cards', () => {
    const invalidCards = findInvalid([valid1, invalid1, valid2, invalid2]);

    expect(invalidCards).toContain(invalid1);
    expect(invalidCards).toContain(invalid2);
    expect(invalidCards).not.toContain(valid1);
    expect(invalidCards).not.toContain(valid2);
  });
});
