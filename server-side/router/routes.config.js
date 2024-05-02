import { Router } from 'express';
import { home_controller } from "../controllers/home_controller.js";
import { api_me, login, logout, subscribe } from "../controllers/auth_controller.js";


export const router = Router();

// Route test
router.get('/', home_controller);


// Authentification
router.post('/api/auth/subscribe', subscribe);
router.post('/api/auth/login', login);
router.get('/api/auth/logout', logout);
router.get('/api/me', api_me);

