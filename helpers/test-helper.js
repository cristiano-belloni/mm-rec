require('babel-core/register')({
  ignore (filename) {
    if (filename.indexOf('/.css') > -1) {
      return true
    }
    return false
  }
})

require.extensions['.css'] = function () {
  return {}
}
