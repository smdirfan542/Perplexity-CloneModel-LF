import chatModel from "../models/chat.model.js";
import { generateResponse } from "../services/ai.service.js";
import { generateTitle } from "../services/ai.service.js";
import msgModel from "../models/message.model.js";

export async function sendMessageController(req,res){
    const {message,chatId}=req.body;
    const user = req.user;
    let title,chat;

    if(!chatId){
         title = await generateTitle(message);
         chat = await chatModel.create({
        user:user.id,
        title,
        })
        chatId=chat._id;    // INSTEAD OF SAME chatId can use chatId || chat._id
    }

    
    const userrequest = await msgModel.create({
        chat:chatId,  // INSTEAD OF SAME chatId can use chatId || chat._id
        content:message,
        role:"user"
    })
    
    
    
    const msgOfsameId = await msgModel.find({chat:chatId})
    const result = await generateResponse(msgOfsameId);
    
    const Aimessages = await msgModel.create({
        chat:chatId, // INSTEAD OF SAME chatId can use chatId || chat._id
        content:result,
        role:"ai"
    })
    
    const updatedmsglist = await msgModel.find({chat:chatId});

    // const [result , title]=await Promise.all([
    //     generateResponse(message),
    //     generateTitle(message)
    // ])

    // res.status(201).json({
    //     Title:title,
    //     You:message,
    //     AI:result,
    //     success:true,
    //     chat:chat,
    //     message:messages
    // })
    res.status(201).json({
        title,
       updatedmsglist,
        
    })
}

export async function getchatsController(req,res){
    const user = req.user;
    const chats = await chatModel.find({user:user.id})
    res.status(200).json({
        message:'chats retrieved successfully'
        ,chats
    })
}

export async function getMessageController(req,res){
    const {chatId}=req.params
    
    const chatdata = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    });

    if(!chatdata){
        return res.status(404).json({
            message:'chat not found',
            chatid:chatId
            ,success:false
        })
    }
    const messagedata = await msgModel.find({
        chat:chatId
    })
    res.status(200).json({
        message:'Messages retrieved successfully'
        ,messagedata
    })
}

export async function deleteChatController(req,res){
    const {chatId}=req.params;

    const chatDet = await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id,

    });
    if(!chatDet){
        return res.status(400).json({
            message:'chat not found'
            ,success:false
        })
    }
    await msgModel.deleteMany({chat:chatId})
    res.status(200).json({
        message:'deleted successfully'
        ,success:true
    })
}