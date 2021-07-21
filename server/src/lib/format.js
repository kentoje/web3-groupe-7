const keep = (...tags) => (value) => tags.reduce((accu, tag) => ({
  ...accu,
  [tag]: Object.keys(value).some((key) => key === tag) && value[tag],
}), {});

module.exports = {
  keep,
};
