import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    raze:{
        type: String,
        required: true
    },

    size:{
        type: String,
        required: true,
        enum: ['SMALL', 'MEDIUM', 'LARGE BREEDS', 'GIANT BREEDS']
    },

    weight:{
        type: String,
        required: true
    },

    age:{
        type: String,
        minLength: 2,
        maxLength: 2
    }
})

export default mongoose.model('animal', animalSchema)