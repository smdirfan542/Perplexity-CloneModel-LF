import { InitSocketClient } from "../Services/chat.socket"
import { sendMessage } from "../Services/chat.api"
import { getChats } from "../Services/chat.api"
import { getMessages } from "../Services/chat.api"
import {addNewMessage,setError,setIsLoading,setChatMessages,setCurrentchatid,setChats,createNewchat} from '../chat.slice'
import {useDispatch, useSelector} from 'react-redux'

export const useChat=()=>{

    const dispatch = useDispatch();
    const chats = useSelector((state)=>state.chat.chats)

   async function HandlesendMessage({message,chatId}){
        dispatch(setIsLoading(true));
        try{
        const data =await sendMessage({message,chatId});
        const {chat,Aimessage}=data

      
        if(!chats[chat._id]){

            
            dispatch(createNewchat({
                chatId:chat._id,
                title:chat.title,
            }))
        }
        dispatch(addNewMessage({
            chatId:chat._id,
            content:message,
            role:'user'}))
        dispatch(addNewMessage({
            chatId:chat._id,
            content:Aimessage.content,
            role:'ai',
        }))
        dispatch(setCurrentchatid(chat._id))
        
    }catch(error){
        dispatch(setError(error.response?.data?.message || error.message || 'failed to send a message'))
    }finally{
        dispatch(setIsLoading(false))
    }
    }
    
    async function LoadChats(){
        try{
            dispatch(setError(null));
            const data = await getChats();

            const chatsObject={}

            data.chats.forEach((chat)=>{
                chatsObject[chat._id]={
                    id:chat._id,
                    title:chat.title,
                    messages:[],
                    lastUpdated:new Date().toISOString(),
                }
            })
            dispatch(setChats(chatsObject))
        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message || 'failed to load chats'))
        }

    }
    async function LoadMessages(chatId) {
    try {
        const data = await getMessages(chatId);

        const messages = data.messagedata;

        messages.forEach((message) => {
            
         dispatch(setChatMessages({
            chatId,
            messages: data.messagedata.map((message) => ({
                content: message.content,
                role: message.role,
    })),
}));
        });
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message ||
            error.message ||
            "Failed to load messages"
        ));
    }
}
    
    return {
        InitSocketClient,
        HandlesendMessage,
        LoadChats,
        LoadMessages
    }
}