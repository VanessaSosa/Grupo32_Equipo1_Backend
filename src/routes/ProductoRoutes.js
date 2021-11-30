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
        this.router.get('/producto', productoC.get);
        //Crear objeto TokenController
        const tokenC = new TokenController();
        //Middleware
        this.router.use(tokenC.verifyAuth);
        //Configurar/crear rutas
        this.router.post('/crearproducto', productoC.crear);
        this.router.get('/producto/user', productoC.getByUser);
        this.router.put('/producto',productoC.modificar);
        this.router.delete('/producto',productoC.eliminar);

    }
}


module.exports = ProductoRoutes