

import { Router } from "express";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";
import {
   add_commande,
   all_commandes,
   delete_commande,
   finaliser_commande
} from "../controllers/commande_controller.js";


export const router = Router();



router.get('/all', securityMiddleware, all_commandes);

router.post('/add/:serviceId/:toUserId', securityMiddleware, add_commande);



router.patch('/finaliser/:commandeId', securityMiddleware, finaliser_commande);


router.delete('/delete/:commandeId', securityMiddleware, delete_commande);




export default router;