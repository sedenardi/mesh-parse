const Transform = require('stream').Transform;
const parseRecord = require('./parse').parseRecord;

const START_STR = '<DescriptorRecord ';
const END_STR = '</DescriptorRecord>';

class MeshTransform extends Transform {
  constructor() {
    super({
      readableObjectMode: true
    });
    this.buf = '';
  }
  readBuffer() {
    const start = this.buf.indexOf(START_STR);
    const end = this.buf.indexOf(END_STR);
    if (start > -1 && end > -1) {
      const str = this.buf.substring(start, end + END_STR.length);
      const record = parseRecord(str);
      this.buf = this.buf.substring(end + END_STR.length);
      return record;
    } else {
      return null;
    }
  }
  _transform(chunk, encoding, done) {
    this.buf += chunk.toString();
    let newObj = this.readBuffer();
    while (newObj) {
      this.push(newObj);
      newObj = this.readBuffer();
    }
    done();
  }
  _flush(done) {
    let newObj = this.readBuffer();
    while (newObj) {
      this.push(newObj);
      newObj = this.readBuffer();
    }
    done();
  }
}

module.exports = MeshTransform;
