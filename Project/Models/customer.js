var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var custModel = new Schema({
    First: {type: String},
    Last: {type: String},
    Email: {type: String}
});

module.exports = mongoose.model('Customer', custModel);