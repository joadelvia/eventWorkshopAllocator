const {request, response} = require('express');

const isAdminRol = (req=request, res=response, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg: 'No se ha validado el token primero'
        })
    }

    const {rol, name} = req.user;

    if (rol!== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    }

    next();
}

const hasRol = ( ...roles ) => {
    return (req=request,res=response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'No se ha validado el token primero'
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: `${req.user.name} no tiene el rol adecuado`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRol,
    hasRol
}