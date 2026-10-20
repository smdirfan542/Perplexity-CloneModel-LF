import app from "./src/app.js";
import { DbConnect } from "./src/config/database.js";
import dotenv from 'dotenv'

// import { testAi } from "./src/services/ai.service.js";
import { mistraltestAi } from "./src/services/mistralai.services.js";

import http from 'http'
import { initSocket } from "./src/Socket/socket.services.js";
dotenv.config();

const httpServer = http.createServer(app)

initSocket(httpServer)


// testAi();

DbConnect();

httpServer.listen(3000,()=>{
    console.log('server is running')
})