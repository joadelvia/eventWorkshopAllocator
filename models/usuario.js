const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is require'],
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN', 'EDITOR', 'USER']
    },
    cupo: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    registeredWorkshops: [
        {
            workshop: {
                type: Schema.Types.ObjectId,
                ref: 'Workshop',
            },
            group: {
                type: Schema.Types.ObjectId,
                ref: 'Workshop.groups',
            },
        },
    ]
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema)

