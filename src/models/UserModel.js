const {Schema, model} = require('mongoose');

const userSchema = Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    correo: {
        type: String
    },
    contraseña: {
        type: String
    }
},{
    collection: 'users'
})

module.exports = model('User', userSchema);
