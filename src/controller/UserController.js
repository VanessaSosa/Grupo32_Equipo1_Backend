const User = require('../models/UserModel')
const jsonwebtoken = require('jsonwebtoken');


class UserController{

    registrar(req,res){
        let objUser = req.body;
        if(objUser.nombre && objUser.apellido && objUser.contraseña && objUser.correo){
           User.create(objUser, (error, doc)=>{
            if(error){
                res.status(500).json({mensaje: "Error de inserción"});
            }else{
                console.log(doc);
            let token = jsonwebtoken.sign({id: doc._id}, process.env.NODE_PRIVATE_KEY);
            res.status(201).json({token});
            }
        }); 
        }else{
            res.status(400).json({info: "Información incompleta"});
        }
        
    }

    login(req,res){
        let {correo, contraseña} = req.body;
        User.find({correo, contraseña},(error,docs)=>{
            if(error){
                console.log(error);
                res.status(500).send();
            }else{
                if(docs.length>0){
                    //Generar token
                let token = jsonwebtoken.sign({id: docs[0]._id}, process.env.NODE_PRIVATE_KEY);
                res.status(200).json({token});
                }else{
                    res.status(401).json({mensaje: "credenciales no válidas"})
                }
                
            }
        })
    }
}

module.exports=UserController;