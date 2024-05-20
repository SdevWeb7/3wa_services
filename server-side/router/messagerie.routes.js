import { Router } from "express";
import { all_messages, handle_send_message, send_message } from "../controllers/messagerie_controller.js";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";


export const router = Router();


router.get('/all', securityMiddleware, all_messages);

router.get('/send/:toId', securityMiddleware, send_message);

router.post('/send/:toId', securityMiddleware, handle_send_message);



export default router;