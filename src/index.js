//Requerimos las dependencias necesarias
require('dotenv').config();
const express = require('express')
const morgan = require('morgan')

//Importar módulos
const ConnDb = require('./database/connDb');
const ProductoRoutes = require('./routes/ProductoRoutes');
const UserRouter = require('./routes/UserRouter');

//const cors = require('cors')
//const bodyparser = require('body-parser')

//Voy a configurar el puerto

class Server{
    constructor(){
        this.connDb = new ConnDb();
        //Crear aplicación express
        this.app = express();
        this.config();

    }

    config(){
        //Indicar que se procesarán datos en formato json
        this.app.use(express.json());
        //Indicar el uso de morgan para el monitoreo de las peticiones http
        this.app.use(morgan());
        //configurar/almacenar el puerto por el que correrá el servidor
        this.app.set('PORT', process.env.PORT || 4000);
        //-----------Crear rutas------------------/endpoint (api) raíz
        let router = express.Router();
        router.get('/', (req,res)=>{
            res.status(200).json({mensaje: "Todo está ok"});
        });
        let userR = new UserRouter();
        let productR = new ProductoRoutes();
        //----------------añadir ruta a express------------------
        this.app.use(router);
        this.app.use(userR.router)
        this.app.use(productR.router);
        //levantar/poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), ()=>{
            console.log("Soy el servidor y estoy corriendo por el puerto", this.app.get('PORT'));
        });
    }
}

new Server();


//app.use(morgan('dev'))
//app.use(bodyparser.urlencoded({extended:true}))
//app.use(bodyparser.json())
//app.use(cors({origen: '*'}))

//app.use('/admin',require('./routes/AdminRoutes'))
//app.use('/product', require('./routes/ProductoRoutes'))

