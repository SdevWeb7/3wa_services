import { Commande } from "../models/Commande.js";

export const add_commande = async (req, res) => {
      try {
         await Commande.add(req.session.user.id, req.params.serviceId, req.body.date, req.params.toUserId);
         res.status(200).json({ message: "Commande ajoutée." });
      } catch (error) {
         res.status(500).json({ message: error.message, err: 'Il y a eu un problème.' });
      }
}


export const all_commandes = async (req, res) => {
      try {
         const [commandesPasses, commandesRecues] = await Commande.all(req.session.user.id);
         res.status(200).json([commandesPasses, commandesRecues]);
      } catch (error) {
         res.status(500).json({ message: error.message, err: 'Il y a eu un problème.' });
      }
}


// export const finaliser_commande = async (req, res) => {
//       try {
//          await Commande.finaliser(req.params.commandeId);
//          res.status(200).json({ message: "Commande finalisée." });
//       } catch (error) {
//          res.status(500).json({ message: error.message, err: 'Il y a eu un problème.' });
//       }
// }
//
// export const delete_commande = async (req, res) => {
//       try {
//          await Commande.delete(req.params.commandeId);
//          res.status(200).json({ message: "Commande supprimée." });
//       } catch (error) {
//          res.status(500).json({ message: error.message, err: 'Il y a eu un problème.' });
//       }
// }