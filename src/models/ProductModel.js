
const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    codigo: Number,
    nombre_producto: String,
    descripcion: String,
    tipo : String,
    sabor: String,
    marca: String,
    presentacion: String,
    contenido_neto: Number,
    valor: Number,
    url_img: String,
    user_id: String
},{
    collection: 'productos'
})

module.exports = model('Producto', ProductSchema);