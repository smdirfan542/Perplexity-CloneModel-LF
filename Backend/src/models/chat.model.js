import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userdet',
        required:true,
    },
    
    title:{
        type:String,
        default:'New Chat'
    },
   
},{timestamps:true})

const chatModel = mongoose.model('chatdet',chatSchema)

export default chatModel;