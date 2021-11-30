
const Producto = require('../models/ProductModel')
const TokenController = require('./TokenController');

const jwt = require('jsonwebtoken')

class ProductoController {

    constructor() {
        //Crear atributo de la clase de tipo TokenController
        this.tokenC = new TokenController();

    }

    crear = (req, res) => {
        //Obtener datos del cuerpo de la petición
        let { codigo, nombre_producto, descripcion, tipo, sabor, marca, presentacion, contenido_neto, valor, url_img } = req.body;
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        //Obtener el id del usuario a partir del token
        let user_id = decode.id;
        //Crear producto en la DB
        Producto.create({ codigo, nombre_producto, descripcion, tipo, sabor, marca, presentacion, contenido_neto, valor, url_img, user_id: decode.id }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ doc })
            }
        });
    }
    
    getByUser = (req, res) => {
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        //Obtener el id del usuario a partir del token
        let user_id = decode.id;
        //obtener los productos por usuario
        Producto.find({ user_id }, (error, docs) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(docs);
            }
        });
    }

    get = (req, res)=>{
        Producto.find((error, docs)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json(docs);
            }
        });
    }

    modificar = (req,res) =>{
        //Obtener datos del producto
        let { id, codigo, nombre_producto, descripcion, tipo, sabor, marca, presentacion, contenido_neto, valor, url_img} = req.body;
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        //Obtener el id del usuario a partir del token
        let user_id = decode.id;
        //Actualizar producto por usuario en la base de datos
        /***
         * Primer parámetro ( {_id: id, user_id} ): objeto con las opciones de búsqueda en la BD
         * Segundo parámetro: ( {name, price} ): Campos/valores a actualizar en el documento
         * Tercer parámetro ( (error, doc)=>{} ): callback, función a ejecutarse cuando se envia la petición
         * *****/

        Producto.findOneAndUpdate({_id: id, user_id},{codigo, nombre_producto, descripcion, tipo, sabor, marca, presentacion, contenido_neto, valor, url_img},(error, doc) =>{
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json({mensaje: "Producto actualizado"});
            }
        })
    }

    eliminar = (req, res) => {
        //Obtener id del cuerpo de la peticion
        let { id } = req.body;
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        //Obtener el id del usuario a partir del token
        let user_id = decode.id;
        Producto.findOneAndRemove({_id:id, user_id},(error, doc)=>{
            if(error){
                res.status(500).json(error);
            }else{
                if(doc){
                   res.status(200).json({mensaje: "producto eliminado"}) 
                }else{
                    res.status(200).json({mensaje: "no se eliminó ningún producto"}) 
                }
                
            }
        });
    }
}


module.exports = ProductoController;

