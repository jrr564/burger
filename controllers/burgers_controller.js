var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post('/burgers/add', function (req, res) {
	burger.create('burger_name', req.body.burger_name, function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/devour/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	burger.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});

module.exports = router;
