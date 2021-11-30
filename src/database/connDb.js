const mongoose = require('mongoose');
const {db} = require('./urlDb')

class ConnDb{
    constructor(){
        this.conexion();
    }

    async conexion(){
        //Opción 1
        //this.conn = await mongoose.connect(db);
        //Opción 2
        mongoose.connect(db).then(()=>{
            console.log("Estoy conectado a la base de datos :D")
        })
    }
}

module.exports = ConnDb;