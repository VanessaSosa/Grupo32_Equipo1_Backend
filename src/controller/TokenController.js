const jwt = require('jsonwebtoken');

class TokenController{

    verifyAuth = (req, res, next)=>{
        //Obtener token
        let token = this.getToken(req);
        //Verificar token
        jwt.verify(token, process.env.NODE_PRIVATE_KEY, (error, decode)=>{
            if(error){
                res.status(401).json({mensaje: "Usuario no autorizado"})
            }else{
                next();
            }
        });
    }

    getToken=(req)=>{
        let token = null;
         //Capturar el bearer token de la cabecera
         let authorization = req.headers.authorization;
         if(authorization != null && authorization != undefined){
            token = authorization.split(" ")[1];
         }
         //Realizar split para eliminar los espacos (crea un arreglo)
         return token;
    }
}

module.exports = TokenController;