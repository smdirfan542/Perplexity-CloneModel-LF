import Router from 'express'
import { getchatsController, getMessageController, sendMessageController } from '../Controllers/chat.controller.js';
import { authUser } from '../Middleware/auth.middleware.js';

const chatRouter = Router();

chatRouter.post('/message',authUser,sendMessageController)
chatRouter.get('/getChats',authUser,getchatsController)
chatRouter.get('/:chatId/getmessages',authUser,getMessageController)

export default chatRouter;