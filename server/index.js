const express = require('express')
const config = require('config')
const router = require('./router')
const mongoConnect = require('./mongo-connect')
const mongoUrl = config.get('mongoUrl')

if (!mongoUrl) {
  console.error('Please set the MM_MONGO_URL env variable to start the server')
  process.exit(1)
}

if (!module.parent) {
  mongoConnect(mongoUrl, (err) => {

    if (err) {
      console.error(err)
      process.exit(2)
    }
    const app = express()

    app.use('/', router)
    app.listen(8888, '0.0.0.0', function (err) {
      if (err) {
        console.error(err)
        return
      }
      console.log('Listening at http://0.0.0.0:8888')
    })
  })
}

module.exports = router
