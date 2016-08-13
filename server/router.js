const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
router.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  const config = require('./../webpack.config.development.js')
  const webpack = require('webpack')
  const compiler = webpack(config)
  router.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
  router.use(require('webpack-hot-middleware')(compiler))
  router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'))
  })
}

router.use('/build', express.static(path.join(__dirname + '/../build')))
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = router
