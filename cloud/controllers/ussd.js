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

        var text = "";

        CRUD().findAll(Guest, findObject, 'asc', 1000, 0, function (data) {
            if (data) {
                if (data.length > 1) {

                    text = "";

                    for (var i = 0; i < data.length; i++) {
                        text += "Seat " + data[i].seat + ": " + data[i].name + " " + data[i].surname + "\n";
                    }

                    res.type('text/plain');
                    res.send(util.format(nodes.Home.Text, data[0].table, text));

                    request("http://api.panaceamobile.com/json?action=message_send&username=CrunchingCode&password=nchongin00&to=" + req.query.ussd_msisdn + "&text=" + util.format(nodes.Home.Text, data[0].table, text) + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(response);
                        } else {
                            console.log(response);
                        }
                    });

                } else if (data.length > 0) {

                    text = "";

                    text += "Seat " + data[0].seat + ": " + data[0].name + " " + data[0].surname + "\n";

                    res.type('text/plain');
                    res.send(util.format(nodes.Home.Text, data[0].table, text));

                    request("http://api.panaceamobile.com/json?action=message_send&username=CrunchingCode&password=nchongin00&to=" + req.query.ussd_msisdn + "&text=" + util.format(nodes.Home.Text, data[0].table, text) + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(response);
                        } else {
                            console.log(response);
                        }
                    });

                } else {
                    res.type('text/plain');
                    res.send(util.format(nodes.Home.Error, req.query.ussd_msisdn));
                }

            } else {
                res.type('text/plain');
                res.send(util.format(nodes.Home.Error, req.query.ussd_msisdn));
            }
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Home.Error, req.query.ussd_msisdn));
        });

    });

    app.get('/api/ussd/exit', function (req, res) {
        res.type('text/plain');
        res.send(nodes.Exit.Text);
    });

};