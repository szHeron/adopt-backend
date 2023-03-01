import express from 'express';
const routes = express.Router();
const UserController = require('./controllers/UserController')
const AnimalController = require('./controllers/AnimalController')
const FavoriteController = require('./controllers/FavoriteController')
const tokenController = require('./controllers/VerifyToken')
const imageController = require('./controllers/ImageController')

//Controladores de usuario
routes.get('/users/:id', tokenController.verifyToken, UserController.getUser);
routes.post('/users/register', tokenController.verifyToken, UserController.register);
routes.put('/users/:id', tokenController.verifyToken, UserController.update);
routes.delete('/users/:id', tokenController.verifyToken, UserController.delete);

//Controladores dos animais
routes.post('/animal', tokenController.verifyToken, AnimalController.create);
routes.delete('/animal/:id', tokenController.verifyToken, AnimalController.delete);
routes.get('/animal', tokenController.verifyToken, AnimalController.getAnimals);

//Controladores dos favorritos
routes.post('/favorite', tokenController.verifyToken, FavoriteController.create);
routes.delete('/favorite/:id', tokenController.verifyToken, FavoriteController.delete);
routes.get('/favorite', tokenController.verifyToken, FavoriteController.getFavorites);

routes.post('/uploadImage', tokenController.verifyToken, imageController.uploadNewImage);

module.exports = routes;