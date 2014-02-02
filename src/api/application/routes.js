var apiController = require('./controllers/api'),
    crudable = require('./controllers/crudable');


module.exports.initialize = function (app) {

    app.get('/', apiController.index);

    app.get('/crudable', crudable.all);
    app.get('/crudable/:id', crudable.getById);
    app.post('/crudable', crudable.create);
    app.put('/crudable/:id', crudable.update);
    app.delete('/crudable/:id', crudable.del);
};
