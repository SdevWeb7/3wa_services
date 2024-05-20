import { Router } from 'express';
import { home_controller } from "../controllers/home_controller.js";
import authRoutes from "./auth.routes.js";
import messagerieRoutes from "./messagerie.routes.js";
import servicesRoutes from "./services.routes.js";


const router = Router();


// Route Test
router.get('/', home_controller);


// Authentification et Profil
router.use('/api/auth', authRoutes);


// Services
router.use('/api/services', servicesRoutes);


// Messagerie
router.use('/api/messagerie', messagerieRoutes);



export default router;
