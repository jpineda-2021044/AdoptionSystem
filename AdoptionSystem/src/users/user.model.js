import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    surname:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true, //SOLO PUEDE EXISITIR UN REGISTRO UNICO
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 chactars'],    
        required: true
    },

    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'], //SOLO LOS DAOTS QUE ESTAN EN EL ARREGLO SON VALIDO
        required: true
    }
})


//PRE MONGOOOSE

                            //PLURALIZAR
export default mongoose.model('user', userSchema)