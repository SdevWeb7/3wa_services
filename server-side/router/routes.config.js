import { Router } from 'express';
import { home_controller } from "../controllers/home_controller.js";


export const router = Router();


router.get('/', home_controller);



router.get('/api', (req, res) => {
   res.json({ message: 'Hello from server!' });
});