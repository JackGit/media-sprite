(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else {
    // Browser globals
    root.correctIndex = factory()
  }
})(this, function () {
  function correctIndex (index, length) {
    if (index >= 0) {
      index %= length
    } else {
      index = (length + index % length) % length
    }
    return index
  }
  return correctIndex
})
