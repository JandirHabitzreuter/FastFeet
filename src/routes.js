import { Router } from 'express';
import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

// Vai valer somente para as rotas que vieram depois
routes.use(authMiddleware);

routes.put('/users', userController.update);

module.exports = routes;
