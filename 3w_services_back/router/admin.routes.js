import { Router } from "express";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
   adminDashboard,
   banUser,
   deleteReportedService,
   restoreReportedService
} from "../controllers/admin_controller.js";



export const router = Router();


router.get('/all', adminMiddleware, adminDashboard);

router.delete('/delete/:serviceId', adminMiddleware, deleteReportedService);
router.patch('/restore/:serviceId', adminMiddleware, restoreReportedService);
router.patch('/ban/:userId', adminMiddleware, banUser);


export default router;