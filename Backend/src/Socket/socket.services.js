import {Server} from 'socket.io'

let io;

export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true,
        }
    })

    console.log("Socket.io is running")

    io.on("connection",(socket)=>{
        console.log("A user is connected to socket " + socket.id)
    })


}

export function getio(){
    if(!io){
        throw new Error("Socket.io is not initialized") 
    }
    return io;
}