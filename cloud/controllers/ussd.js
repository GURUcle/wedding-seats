var request = require('request');
var util = require('util');
var nodes = require('../resources/nodes.json');

var CRUD = require('../utils/crud');
var Guest = require('../models/guest');

module.exports = function (app) {

    app.get('/api/ussd/home', function (req, res) {

        var findObject = {
            contact: req.query.ussd_msisdn
        };

        CRUD().findOne(Guest, findObject, function (data) {
            if (data) {
                res.type('text/plain');
                res.send(util.format(nodes.Home.Text, data.name, data.surname, data.table, data.seat));
            } else {
                res.type('text/plain');
                res.send(util.format(nodes.Home.Error, req.query.ussd_msisdn));
            }
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Home.Error.Text, data.name, data.surname, data.table, data.seat));
        });

    });

    app.get('/api/ussd/exit', function (req, res) {
        res.type('text/plain');
        res.send(nodes.Exit.Text);
    });

};