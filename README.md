# unix-head-tail

[![Build Status](https://travis-ci.org/gpryor/unix-head-tail.svg?branch=master)](https://travis-ci.org/gpryor/unix-head-tail)

`head -n <endLine> <filename> | tail -n +<begLine>` for node.js.

```
var headTail = require('unix-head-tail')

// head -n 7 test.txt | tail -n +3
headTail('test.txt', 3, 7, (err, b) => {
  console.log('test.txt lines 3 to 7 are...')
  console.log(b.toString())
})
```
