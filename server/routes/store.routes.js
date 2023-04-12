const Controller = require('../controllers/store.controller');

module.exports = app => {
    app.get('/api/stores', Controller.findAll);
    app.get('/api/stores/:id', Controller.findOneSingle);
    app.post('/api/stores/new', Controller.createNew);
    app.put('/api/stores/:id/update', Controller.updateExisting);
    app.delete('/api/stores/:id/delete', Controller.deleteAnExisting);
}