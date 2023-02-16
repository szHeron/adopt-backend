import express from "express";
const routes = express.Router();
const UserController = require('./controllers/UserController');

//Controladores de usuario
routes.post('/users', UserController.create);
//routes.get('/users', UserController.read);
//routes.put('/users/:id', UserController.update);
//routes.delete('/users/:id', UserController.delete);

module.exports = routes;