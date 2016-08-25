var mongoose = require('mongoose');

module.exports = mongoose.model('Guest', new mongoose.Schema({
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    contact: { type: String, default: "" },
    table: { type: String, default: "" },
    seat: { type: String, default: "" },
    created_on: { type: Date, default: Date.now }
}));