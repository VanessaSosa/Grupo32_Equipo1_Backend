
const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    cod: {
        type: Number
    },
    name: {
        type: String
    },
    description: {

        type: String
    },
    kind : {
        type: String
    },
    flavor:{
        type: String
    },
    brand: {
        type: String
    },
    presentation: {
        type: String
    },
    cont: {
        type: Number
    },
    price: {
        type: Number
    },
    user_id:{
        type: String
    }
    //img: String
},{
    collection: 'productos'
})

module.exports = model('Producto', ProductSchema);