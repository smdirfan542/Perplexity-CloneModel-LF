import { Router } from "express";
import { registerValidation,loginValidator } from "../Validator/auth.validator.js";
import { registerController } from "../Controllers/auth.controllers.js";
import { loginController } from "../Controllers/auth.controllers.js";
import { deleteController } from "../Controllers/auth.controllers.js";
import { verifyemailController } from "../Controllers/auth.controllers.js";
import { checkuserController } from "../Controllers/auth.controllers.js";
import { authUser } from "../Middleware/auth.middleware.js";
import { getmeController } from "../Controllers/auth.controllers.js";
const authRouter = Router();

authRouter.post('/register',registerValidation,registerController)
authRouter.delete('/deleteregister',deleteController);
authRouter.get('/verify-email',verifyemailController);
authRouter.post('/checkuser',checkuserController);
authRouter.post('/login',loginValidator,loginController);
authRouter.get('/get-me',authUser,getmeController);
export default authRouter;