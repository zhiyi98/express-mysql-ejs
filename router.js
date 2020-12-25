const express = require('express')
const route = express.Router()
const mysql = require('mysql')
const moment = require('moment')

let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'crud_test',
  password: '123456',
  database: 'crud_test'
})

// http://localhost:3000/getStudents
// http://localhost:3000/getStudents?name=张
route.get('/getStudents', (req, res) => {
  let params = []
  let sql = 'select * from user where 1=1 '
  if (req.query.name) {
    sql += 'and name like ?'
    params.push(`%${req.query.name}%`)
  }
  if (req.query.id) {
    sql += 'and id like ?'
    params.push(`%${req.query.id}%`)
  }

  pool.getConnection(function (err, connection) {
    connection.query(sql, params, function (error, results, fields) {
      connection.release()
      res.render('student', {
        res: results,
        moment: moment
      })
    })
  })

})

// http://localhost:3000/getStudents?delete?id=1000
route.get('/delete', (req, res) => {
  let sql = `delete from user where id = ${req.query.id}`

  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      connection.release()
      /**
       * 返回状态
       */
      res.json({
        delstatus: 1
      })
    })
  })

})

// http://localhost:3000/edit?id=1000
route.get('/edit', (req, res) => {
  let sql = `select * from user where id = ${req.query.id}`

  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      connection.release()
      res.render('editStu', {
        studentobj: {
          id: results[0].id,
          name: results[0].name,
          date: moment(results[0].date).format("YYYY-MM-DD"),
          sex: results[0].sex,
          email: results[0].email,
          county: results[0].county,
          message: results[0].message,
        }
      })
    })
  })

})

// http://localhost:3000/update?id=3&name=...
route.get('/update', (req, res) => {
  let sql = `update user set
  id='${req.query.id}',
  name='${req.query.name}',
  date='${req.query.date}',
  county='${req.query.county}',
  email='${req.query.email}',
  sex='${req.query.sex}',
  message='${req.query.message}'
  `

  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      connection.release()
      res.redirect('/getStudents')
    })
  })

})

module.exports = route