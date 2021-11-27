//Requerimos las dependencias necesarias
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')

//Voy a configurar el puerto

app.set('Port', process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors({origen: '*'}))

app.listen(app.get('Port'),()=>{
    console.log('Hola soy el servidor y estoy escuchando por el puerto', app.get('Port')) 
})