const { Router } = require('express');
const authMiddleware = require('../src/app/middlewares/auth')
const UserController = require('../src/app/controllers/UserController')
const SessionController = require('../src/app/controllers/SessionController')

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rotas necessarias de autenticação
routes.use(authMiddleware);
routes.put('/users', UserController.update);

module.exports = routes;