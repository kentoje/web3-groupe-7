const fs = require('fs');
const marked = require('marked');

const getDocumentation = async (_, res) => {
  const [path] = __dirname.split('/server');

  fs.readFile(`${path}/README.md`, 'utf8', (err, data) => {
    if (err) {
      res.send(`Code: ${err.code}`);

      return;
    }

    res.send(marked(data));
  });
};

module.exports = {
  getDocumentation,
};
