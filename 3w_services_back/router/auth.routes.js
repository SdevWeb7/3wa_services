import { Router } from "express";
import {
   api_me,
   deleteUser,
   editUser,
   login,
   logout,
   subscribe
} from "../controllers/auth_controller.js";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";


export const router = Router();


router.get('/me', api_me);

router.post('/subscribe', subscribe);

router.post('/login', login);

router.delete('/delete', securityMiddleware, deleteUser);

router.patch('/edit', securityMiddleware, editUser);

router.get('/logout', logout);


export default router;