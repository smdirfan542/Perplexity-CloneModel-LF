import mongoose from "mongoose";

const msgSchema= new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatdet',
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','ai'],
        required:true
    },

},{timestamps:true})

const msgModel = mongoose.model('msgdet',msgSchema)

export default msgModel;