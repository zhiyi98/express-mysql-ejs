const express = require('express')
const route = express.Router()

route.get('/getStudents', (req, res) => {
  console.log('getStudents:', req.query)
})

module.exports = route