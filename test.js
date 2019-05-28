// -*- compile-command: "node test.js"; -*-
var assert = require('assert')
var series = require('async').series
M = (s) => { console.log(s); return s }

var fn = 'test.txt'
var gold = (n, m) => { return [0,1,2,3,4,5,6,7,9].slice(n, m+1).join('\n') + '\n' }
var is = (a, b) => { return a.toString() == b.toString() }
var check = (n, m, cb) => {
  return (err, b) => {
    assert(is(b, gold(n, m))); cb()
  }
}



var headTail = require('./index.js')

series([
  (cb) => { headTail(fn, 0, 0, check(0, 0, cb)) },
  (cb) => { headTail(fn, 0, 2, check(0, 1, cb)) },
  (cb) => { headTail(fn, 1, 2, check(0, 1, cb)) },
  (cb) => { headTail(fn, 3, 5, check(2, 4, cb)) },
  (cb) => { headTail(fn, 3, 7, check(2, 5, cb)) }
])
