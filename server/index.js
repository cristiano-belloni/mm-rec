const express = require('express')
const router = require('./router')

if (!module.parent) {
  const app = express()

  app.use('/', router)
  app.listen(8888, '0.0.0.0', function (err) {
    if (err) {
      console.error(err)
      return
    }
    console.log('Listening at http://0.0.0.0:8888')
  })
}
