import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000/api/chats',
    withCredentials:true
})

export const sendMessage = async({message,chatId})=>{
    const response = await api.post('message',{message,chatId})
    return response.data;
}

export const getChats = async()=>{
    const response = await api.get('/getChats')
    return response.data;
}

export const getMessages= async(chatId)=>{
    const response = await api.get(`${chatId}/getmessages`)
    return response.data;
}