import { Router } from "express";
import { all_messages, delete_message, send_message } from "../controllers/messagerie_controller.js";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";


export const router = Router();


router.get('/all', securityMiddleware, all_messages);


router.post('/send', securityMiddleware, send_message);


router.delete('/delete/:messageId', securityMiddleware, delete_message);



export default router;