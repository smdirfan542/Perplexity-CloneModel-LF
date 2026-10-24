import {createSlice} from "@reduxjs/toolkit";
const chatslice = createSlice({
    name:'chat'
    ,
    initialState:{
        chats:{},
        currentchatid:null,
        isLoading:false,
        error:null,
},
reducers:{
    createNewchat:(state,action)=>{
        const {chatId,title}=action.payload
        state.chats[chatId]={
            id:chatId,
            title,
            messages:[],
            lastUpdated:new Date().toISOString(),
        }
       
    },
    addNewMessage:(state,action)=>{
        const {chatId,content,role}=action.payload;
        if(!state.chats[chatId]){
            return;
        }
        state.chats[chatId].messages.push({content,role});
        state.chats[chatId].lastUpdated=new Date().toISOString();

    },
    setChatMessages: (state, action) => {
            const { chatId, messages } = action.payload;

            if (state.chats[chatId]) {
                state.chats[chatId].messages = messages;
            }
        },
    setChats:(state,action)=>{
        state.chats=action.payload;
    },
    setCurrentchatid:(state,action)=>{
        state.currentchatid=action.payload;
    },
    setIsLoading:(state,action)=>{
        state.isLoading=action.payload;
    },
    setError:(state,action)=>{
        state.error=action.payload;
    }
        }

})

export const {setChats,setCurrentchatid,setIsLoading,setChatMessages ,setError,createNewchat,addNewMessage}=chatslice.actions;
export default chatslice.reducer;