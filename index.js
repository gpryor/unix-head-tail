// -*- compile-command: "node test.js"; -*-
var fs = require('fs')
var M = (s) => { console.log(s); return s }

function lineNoToEndIdx(filePath, lineNo, cb) {
  let lineCount = 0, globalIdx = 0
  var reader = fs.createReadStream(filePath)
  if (lineNo <= 0) cb(false, 0)
  reader.on("data", (buffer) => {
    let oriGlobalIdx = globalIdx
    let idx = -1
    lineCount--
    do {
      idx = buffer.indexOf(10, idx + 1)
      if(idx !== -1)
        globalIdx = idx + oriGlobalIdx
      lineCount++
      if (lineCount == lineNo - 1) {
        reader.destroy()
        return cb(false, globalIdx)
      }
    } while (idx !== -1)
  }).on("error", () => { cb(true) })
}

function readFileRange(filePath, begByte, endByte, cb) {
  var bytes = endByte - begByte + 1
  var out = Buffer.allocUnsafe(bytes)
  var fd = fs.open(filePath, 'r', (err, fd) => {
    if (err) return cb(err)
    fs.read(fd, out, 0, bytes, begByte, (err) => {
      if (err) return cb(err)
      cb(false, out)
      fs.close(fd, (err) => {
        if (err) throw(new Error('fs.close() failure'))
      })
    })
  })
}

module.exports = function(filePath, begLine, endLine, cb) {
  begLine = Math.max(begLine, 1)
  endLine = Math.max(endLine, 1)

  return lineNoToEndIdx(filePath, begLine - 1, (err, begByte) => {
    lineNoToEndIdx(filePath, endLine, (err, endByte) => {
      if (begByte > 0) begByte++
      readFileRange(filePath, begByte, endByte - 1, (err, b) => {
        cb(err, b)
      })
    })
  })
}
