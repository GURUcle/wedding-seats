var request = require('request');
var util = require('util');
var nodes = require('../resources/nodes.json');
var xlsx = require('xlsx');

var CRUD = require('../utils/crud');
var Guest = require('../models/guest');

module.exports = function (app) {

    app.get('/api/guest/import', function (req, res) {

        var workbook = xlsx.readFile('web/uploads/guest-template.xlsx');

        var first_sheet_name = workbook.SheetNames[0];

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var guests = [];

        for (var i = 5; i < 305; i++) {

            var createObject = {};

            var address_of_name_cell = 'E' + i;
            var address_of_surname_cell = 'F' + i;
            var address_of_contact_cell = 'I' + i;
            var address_of_table_cell = 'C' + i;
            var address_of_seat_cell = 'D' + i;

            /* Find desired cells */
            var name = worksheet[address_of_name_cell];
            var surname = worksheet[address_of_surname_cell];
            var contact = worksheet[address_of_contact_cell];
            var table = worksheet[address_of_table_cell];
            var seat = worksheet[address_of_seat_cell];

            createObject.name = name.v;
            createObject.surname = surname.v;
            createObject.contact = contact.v;
            createObject.table = table.v;
            createObject.seat = seat.v;

            guests.push(createObject);

        }

        Guest.create(guests, function (error, data) {
            if (error) {
                console.log(JSON.stringify(error));
            } else {
                console.log(JSON.stringify(data));
            }
        });

    });

    app.get('/api/guest', function (req, res) {
        CRUD().findAll(Guest, {}, 'asc', 1000, 0, function (data) {
            res.json(data);
        }, function (error) {
            res.json(error);
        });
    });
};