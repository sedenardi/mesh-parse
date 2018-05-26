const fs = require('fs');
const MeshTransform = require('./lib/stream');

module.exports = function(opts) {
  const file = fs.createReadStream(opts.xmlPath);
  const transform = new MeshTransform();
  return file.pipe(transform);
};
