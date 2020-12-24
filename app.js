const express = require('express')
const app = express()
const stuRouter = require('./router.js')

/**
 * 关键代码
 */
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(stuRouter)

app.listen(3000)