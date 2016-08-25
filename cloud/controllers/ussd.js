var request = require('request');
var util = require('util');
var nodes = require('../resources/nodes.json');

var CRUD = require('../utils/crud');
var Guest = require('../models/guest');

module.exports = function (app) {

    app.get('/api/ussd/home', function (req, res) {
        res.type('text/plain');
        res.send(nodes.Home.Text);
    });

    app.get('/api/ussd/exit', function (req, res) {
        res.type('text/plain');
        res.send(nodes.Exit.Text);
    });

};