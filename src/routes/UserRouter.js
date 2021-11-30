const {Router} = require('express');
const UserController = require('../controller/UserController');

class UserRouter{
    constructor(){
        //Crear ruta como atributo de la clase
        this.router = Router();
        this.config();
    }

    config(){
        //Crear objeto UserController
        const userC = new UserController();
        this.router.post('/user', userC.registrar)
        this.router.post('/user/auth', userC.login)
        
    }
}

module.exports = UserRouter;