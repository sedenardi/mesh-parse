# mesh-parse
Tool for parsing Medical Subject Heading (MeSH) descriptors

### Usage

    npm install mesh-parse

Pass in the parameter `xmlPath` to the location of `desc2018.xml`. Returns a stream of objects.

```js
const mesh = require('mesh-parse');

const meshStream = mesh({
  xmlPath: xmlPath
});

meshStream.pipe(WHEREVER);
```
