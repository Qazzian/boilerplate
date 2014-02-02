var mongoose = require('mongoose'),
    config = require('../config');

module.exports = {
    connect: function () {

        var dbCofig = config.getDB();

        //connect to the db server:
        mongoose.connect('mongodb://' + dbCofig.server);
        mongoose.connection.on('open', function () {
            console.log("Connected to Mongoose...");
        });
    }
};
