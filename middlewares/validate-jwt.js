const { request, response} = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/usuario')

const validateJWT = async (req=request, res=response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try{
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid)
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no válido - usuario deshabilitado'
            })
        }
        req.user = user;
        next();

    }
    catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validateJWT
}