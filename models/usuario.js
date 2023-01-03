import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'The name is required']
    },
    email:{
        type: String,
        required: [true, 'The email is required'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'The password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        required: false
    }
});

//remove the __v and password field from the response
//when execute action into schema
usuarioSchema.methods.toJSON = function(){
    const { _id, __v, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default  model('Usuario', usuarioSchema);