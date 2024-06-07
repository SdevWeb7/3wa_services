import { Router } from "express";
import {
   add_service,
   all_services,
   delete_service,
   report_service,
   user_services
} from "../controllers/services_controller.js";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";


export const router = Router();


router.get('/all', all_services);


router.get('/user', securityMiddleware, user_services);


router.post('/add', securityMiddleware, add_service);


router.delete('/delete/:serviceId', securityMiddleware, delete_service);

router.patch('/report/:serviceId', report_service);


export default router;