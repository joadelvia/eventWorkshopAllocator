const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const getUsers= async(req,res) =>{
    const { limit=5, skip=0} = req.query;
    const users = await User.find({state: true}).limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, users})
}
const addUser = async(req, res) => {

    const { name, email, password, rol, cupo} = req.body;
    

    // Encriptar la contraseña
    const user = new User({name, email, password, rol, cupo})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

const updateUser = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, email, state, ...userBody} = req.body;
    
    const salt = bcryptjs.genSaltSync();
    userBody.password = bcryptjs.hashSync( userBody.password, salt );
    const user = await User.findByIdAndUpdate(id,userBody)

    res.json(user)

}

const delUser = async(req = request, res= response) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {"state": false})
    const authenticatedUser = req.user
    res.json({ user, authenticatedUser})
}

module.exports = {addUser, getUsers,delUser, updateUser}