const sortByStr = (arr) => [...arr].sort((a, b) => a.localeCompare(b));

const isDeeplyEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

module.exports = {
  sortByStr,
  isDeeplyEqual,
};
