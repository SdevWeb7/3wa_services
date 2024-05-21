

import { Router } from "express";
import { securityMiddleware } from "../middlewares/securityMiddleware.js";
import { add_commande, all_commandes } from "../controllers/commande_controller.js";


export const router = Router();



router.get('/all', securityMiddleware, all_commandes);

router.post('/add/:serviceId/:toUserId', securityMiddleware, add_commande);


//
// router.post('/finaliser/:commandeId', securityMiddleware, (req, res) => {
//    res.send('finaliser');
// });
//
//
// router.delete('/delete/:commandeId', securityMiddleware, (req, res) => {
//    res.send('delete');
// });




export default router;