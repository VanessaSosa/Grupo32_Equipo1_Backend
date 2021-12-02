const {Router} = require('express')
const router = Router()
const ProductoController = require('../controller/ProductoController');
const TokenController = require('../controller/TokenController');

class ProductoRoutes{
    constructor(){
        this.router = Router();
        this.config();

    }

    config(){
        //Crear objeto product controller
        const productoC = new ProductoController();
        this.router.get('/product', productoC.get);
        //Crear objeto TokenController
        const tokenC = new TokenController();
        //Middleware
        this.router.use(tokenC.verifyAuth);
        //Configurar/crear rutas
        this.router.post('/product', productoC.crear);
        this.router.get('/product/user', productoC.getByUser);
        this.router.put('/product',productoC.modificar);
        this.router.delete('/product',productoC.eliminar);

    }
}


module.exports = ProductoRoutes;