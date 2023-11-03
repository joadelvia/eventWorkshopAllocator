const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')


const login = async(req=request, res=response) => {
    const { email, password} = req.body
    try{

        //verificar que el email existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg: 'User/password incorrect - email'
            })
        }
        //verificar que el usuario está activo
        if( !user.state){
            return res.status(401).json({
                msg: 'User/password incorrect - inactive'
            })
        }
    
        //verificar que la constraseña es correcta
        const validPassword = bcryptjs.compareSync(password, user.password) 
        if(!validPassword){
            return res.status(401).json({
                msg: 'User/password incorrect - password'
            })
        }

        //Generamos el jwt
        const token = await genJWT(user._id);
        res.json({
            user,
            token
        }        
        )
    } catch (error){
        console.log(error)
        res.status(500).json({
            msg: 'Error en el servidor consulte con el administrador'
        })
    }

}

module.exports = {
    login
}