const adminCtrl = {}
const Admin = require('../models/AdminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

adminCtrl.crear = async (req,res)=>{
    const {nombre,correo,contrasena} = req.body 
    const NuevoAdmin = new Admin({
        nombre,
        correo,
        contrasena
    })
    const correoAdmin = await Admin.findOne({correo:correo})
    if(correoAdmin){
        res.json({
            mensaje: 'El correo ya existe'
        })
    }else{
        NuevoAdmin.contrasena = await bcrypt.hash(contrasena,10)
        const token = jwt.sign({_id: NuevoAdmin._id},'Secreta')
        await NuevoAdmin.save()
        res.json({
            mensaje: 'Bienvenido',
            id: NuevoAdmin._id,
            nombre: NuevoAdmin.nombre,
            token
        })
    }
}

adminCtrl.login = async (req,res) =>{
    const {correo,contrasena}= req.body
    const admin = await Admin.findOne({correo:correo})
    if(!admin){

        return res.json({
            mensaje: 'Correo incorrecto'
        })
    }

    const match = await bcrypt.compare(contrasena, admin.contrasena)

    if(match){
        const token = jwt.sign({_id: admin._id}, 'Secreta')
        res.json({
            mensaje: 'Has iniciado sesión correctamente',
            id: admin.id,
            nombre: admin.nombre,
            token
        })
    }else{
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }
}

module.exports=adminCtrl