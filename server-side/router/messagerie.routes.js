import { Router } from "express";
import { all_messages, handle_send_message, send_message } from "../controllers/messagerie_controller.js";


export const router = Router();


router.get('/all', all_messages);

router.get('/send/:toId', send_message);

router.post('/send/:toId', handle_send_message);



export default router;