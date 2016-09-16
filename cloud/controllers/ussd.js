var request = require('request');
var util = require('util');
var nodes = require('../resources/nodes.json');

var CRUD = require('../utils/crud');
var Guest = require('../models/guest');

module.exports = function (app) {

    app.get('/api/ussd/home', function (req, res) {

        var text = "";
        var tables = [];

        var findObject = {
            contact: req.query.ussd_msisdn
        };

        CRUD().findAll(Guest, findObject, 'asc', 1000, 0, function (data) {
            if (data && data.length > 0) {

                text = "";
                var cursor = 1;

                for (var i = 0; i < data.length; i++) {
                    tables.push(data[i].table);
                }

                var unique = tables.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                for (var x = 0; x < unique.length; x++) {
                    text += cursor + ". Table " + unique[x] + "\n";
                    cursor++;
                }

                var guests = "";
                var counter = 1;

                for (var c = 0; c < data.length; c++) {
                    tables.push(data[c].table);
                    guests += counter + ". " + data[c].name + " " + data[c].surname + " Table: " + data[c].table + " Seat:" + data[c].seat + "\n";
                    counter++;
                }

                res.type('text/plain');
                res.send(util.format(nodes.Home.Text, text));

                request("http://api.panaceamobile.com/json?action=message_send&username=CrunchingCode&password=nchongin00&to=" + req.query.ussd_msisdn + "&text=" + util.format(nodes.SMS.Text, guests) + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
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
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Home.Error, req.query.ussd_msisdn));
        });

    });

    app.get('/api/ussd/custom-number-home', function (req, res) {

        var text = "";
        var tables = [];

        var findObject = {
            contact: req.query.ussd_response_WeddingSeatsMoreOptions
        };

        CRUD().findAll(Guest, findObject, 'asc', 1000, 0, function (data) {
            if (data && data.length > 0) {

                text = "";
                var cursor = 1;

                for (var i = 0; i < data.length; i++) {
                    tables.push(data[i].table);
                }

                var unique = tables.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                for (var x = 0; x < unique.length; x++) {
                    text += cursor + ". Table " + unique[x] + "\n";
                    cursor++;
                }

                var guests = "";
                var counter = 1;

                for (var c = 0; c < data.length; c++) {
                    tables.push(data[c].table);
                    guests += counter + ". " + data[c].name + " " + data[c].surname + " Table: " + data[c].table + " Seat:" + data[c].seat + "\n";
                    counter++;
                }

                res.type('text/plain');
                res.send(util.format(nodes.Home.Text, text));

                request("http://api.panaceamobile.com/json?action=message_send&username=CrunchingCode&password=nchongin00&to=" + req.query.ussd_response_WeddingSeatsMoreOptions + "&text=" + util.format(nodes.SMS.Text, guests) + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(response);
                    } else {
                        console.log(response);
                    }
                });

            } else {
                res.type('text/plain');
                res.send(util.format(nodes.Home.Error, req.query.ussd_response_WeddingSeatsMoreOptions));

            }
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Home.Error, req.query.ussd_response_WeddingSeatsMoreOptions));
        });

    });

    app.get('/api/ussd/chairs', function (req, res) {

        var table = req.query.ussd_response_WeddingSeatsHome;
        var text = "";
        var tables = [];

        var findObject = {};

        if (req.query.ussd_response_WeddingSeatsHome && req.query.ussd_response_WeddingSeatsHome > 10) {
            findObject.contact = req.query.ussd_response_WeddingSeatsHome;
        } else {
            findObject.contact = req.query.ussd_msisdn;
        }

        CRUD().findAll(Guest, findObject, 'asc', 1000, 0, function (data) {
            if (data && data.length > 0) {

                text = "";
                var cursor = 1;
                var index = "" + table - 1;

                for (var i = 0; i < data.length; i++) {
                    tables.push(data[i].table);
                }

                var unique = tables.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                if (table > 10) {
                    for (var y = 0; y < unique.length; y++) {
                        text += cursor + ". Table " + unique[y] + "\n";
                        cursor++;
                    }
                } else {

                    for (var x = 0; x < data.length; x++) {
                        if (data[x].table === unique[index]) {
                            text += cursor + ". Seat " + data[x].seat + "\n";
                            cursor++;
                        }
                    }
                }

                res.type('text/plain');
                res.send(util.format(nodes.Chairs.Text, data[0].table, text));

            }
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Chairs.Error, req.query.ussd_msisdn));
        });
    });

    app.get('/api/ussd/custom-number-chairs', function (req, res) {

        var table = req.query.ussd_response_WeddingSeatsCustomNumberHome;
        var text = "";
        var tables = [];

        var findObject = {};

        if (req.query.ussd_response_WeddingSeatsHome && req.query.ussd_response_WeddingSeatsHome > 10) {
            findObject.contact = req.query.ussd_response_WeddingSeatsHome;
        } else {
            findObject.contact = req.query.ussd_response_WeddingSeatsMoreOptions;
        }

        CRUD().findAll(Guest, findObject, 'asc', 1000, 0, function (data) {
            if (data && data.length > 0) {

                text = "";
                var cursor = 1;
                var index = "" + table - 1;

                for (var i = 0; i < data.length; i++) {
                    tables.push(data[i].table);
                }

                var unique = tables.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                if (table > 10) {
                    for (var y = 0; y < unique.length; y++) {
                        text += cursor + ". Table " + unique[y] + "\n";
                        cursor++;
                    }
                } else {

                    for (var x = 0; x < data.length; x++) {
                        if (data[x].table === unique[index]) {
                            text += cursor + ". Seat " + data[x].seat + "\n";
                            cursor++;
                        }
                    }
                }

                res.type('text/plain');
                res.send(util.format(nodes.Chairs.Text, data[0].table, text));

            }
        }, function (error) {
            res.type('text/plain');
            res.send(util.format(nodes.Chairs.Error, req.query.ussd_response_WeddingSeatsMoreOptions));
        });
    });

    app.get('/api/ussd/more-options', function (req, res) {
        res.type('text/plain');
        res.send(util.format(nodes.MoreOptions.Text, req.query.ussd_msisdn));
    });

    app.get('/api/ussd/exit', function (req, res) {
        res.type('text/plain');
        res.send(nodes.Exit.Text);
    });

};