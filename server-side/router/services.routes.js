import { Router } from "express";
import { add_service, all_services, handle_add_service } from "../controllers/services_controller.js";


export const router = Router();


router.get('/all', all_services);

router.get('/add', add_service);

router.post('/add', handle_add_service);



export default router;