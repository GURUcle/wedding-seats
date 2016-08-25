var mongoose = require('mongoose');

module.exports = mongoose.model('Guest', new mongoose.Schema({
    created_on: { type: Date, default: Date.now }
}));