var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CRUDable = new Schema({
    name: {
        first: { type: String },
        last: { type: String }
    },
    comment: { type: String },
    deleted: { type: Boolean }
});

module.exports = mongoose.model('CRUDable', CRUDable);
