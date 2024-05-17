import { Router } from 'express';
import { home_controller } from "../controllers/home_controller.js";
import { api_me, deleteUser, editUser, login, logout, subscribe } from "../controllers/auth_controller.js";


export const router = Router();

// Route test
router.get('/', home_controller);


// Authentification / Profil
router.get('/api/me', api_me);
router.post('/api/auth/subscribe', subscribe);
router.post('/api/auth/login', login);
router.get('/api/auth/logout', logout);
router.delete('/api/auth/delete/:id', deleteUser);
router.patch('/api/auth/edit/:id', editUser);

