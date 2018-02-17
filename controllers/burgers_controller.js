var express = require('express')
var burger = require('../models/burger')

var router = express.Router()

router.get('/', function (req, res) {
  burger.all(data => {
    var result = {
      burger: data
    }
    console.log(result)
    res.render('index', result)
  })
})

router.post('/api/burgers', function (req, res) {
  console.log(req.body)
  burger.create(['burger_name', 'devoured', 'createAt'], [req.body.name, req.body.devoured, "CURRENT_TIMESTAMP"], data => {
    console.log(data.id)
    res.json({id: data.insertId})
  })
})

router.put('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id
  console.log('condition', condition)
  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

router.delete('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id
  console.log('condition', condition)
  burger.delete(condition, function (result) {
    console.log(result)
    if (result.affectedRows == 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

module.exports = router