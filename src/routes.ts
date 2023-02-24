import express from 'express';
const routes = express.Router();
const UserController = require('./controllers/UserController')
const AnimalController = require('./controllers/AnimalController')
const tokenController = require('./controllers/VerifyToken')

//Controladores de usuario
routes.get('/users/:id', tokenController.verifyToken, UserController.getUser);
routes.post('/users/register', tokenController.verifyToken, UserController.register);
routes.put('/users/:id', tokenController.verifyToken, UserController.update);
routes.delete('/users/:id', tokenController.verifyToken, UserController.delete);

//Controladores dos animais
routes.post('/animal', tokenController.verifyToken, AnimalController.create);
routes.delete('/animal/:id', tokenController.verifyToken, AnimalController.delete);
routes.get('/animal', tokenController.verifyToken, AnimalController.getAnimals);

module.exports = routes;