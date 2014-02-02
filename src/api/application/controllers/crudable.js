var CRUDable = require('../models/crudable');
var dal = require('../db/dal');

module.exports = {
    all: function (req, res) {
        CRUDable.find({deleted: false}, function (err, crudables) {
            res.json({
                action: "all",
                response: crudables
            });
        });
    },
    getById: function (req, res) {
        CRUDable.findOne({ _id: req.params.id }, function (err, crudable) {
            if (err) {
                res.json({
                    action: "byID",
                    error: err
                });
            } else {
                res.json({
                    action: "byID",
                    response: [ crudable ]
                });
            }
        });
    },
    create: function (req, res) {
        var newCRUDable = CRUDable(req.body);
        console.log(req.body);
        newCRUDable.save(function (err, crudable) {
            if (err) {
                res.json({
                    action: "create",
                    error: err
                });
            } else {
                res.json({
                    action: "create",
                    response: [ crudable ]
                });
            }
        });
    },
    update: function (req, res) {
        var crudable = {
            name: {}
        };
        crudable.name.first = req.body.name.first;
        crudable.name.last = req.body.name.last;
        crudable.comment = req.body.comment;

        CRUDable.findOneAndUpdate({ _id: req.params.id }, crudable, {},
            function (err, crudable) {
                if (err) {
                    res.json({
                        action: "update",
                        error: err
                    });
                } else {
                    res.json({
                        action: "update",
                        response: [ crudable ]
                    });
                }
            }
        );
    },
    del: function (req, res) {

        CRUDable.findOneAndUpdate({ _id: req.params.id }, {deleted: true}, {},
            function (err, crudable) {
                if (err) {
                    res.json({
                        action: "update",
                        error: err
                    });
                } else {
                    res.json({
                        action: "update",
                        response: [ crudable ]
                    });
                }
            }
        );
    }
};
