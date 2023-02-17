import express from 'express';
const routes = express.Router();
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const AnimalController = require('./controllers/AnimalController')

//Controladores de usuario
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

//Controladores do post
routes.post('/post', PostController.create);
routes.delete('/post/:id', PostController.delete);

//Controladores do post
routes.post('/animal', AnimalController.create);
routes.delete('/animal/:id', AnimalController.delete);
routes.get('/animal', AnimalController.getAllAnimals);

module.exports = routes;