import { Commande } from "../models/Commande.js";


export const all_commandes = async (req, res) => {
   try {
      const [commandesPasses, commandesRecues] = await Commande.all(req.session.user.id);
      res.status(200).json([commandesPasses, commandesRecues]);
   } catch (error) {
      res.status(500).json({
         message: 'Il y a eu un problème.',
         err: 'Il y a eu un problème.' });
   }
}

export const add_commande = async (req, res) => {
      try {
         await Commande.add(req.session.user.id, req.params.serviceId, req.body.date);
         res.status(200).json({ message: "Commande ajoutée." });
      } catch (error) {
         res.status(500).json({
            message: 'Il y a eu un problème.',
            err: 'Il y a eu un problème.' });
      }
}

export const finaliser_commande = async (req, res) => {
   const { cost, fromUserId } = req.body;
      try {
         await Commande.finaliser(req.params.commandeId, req.session.user.id, cost, fromUserId);
         res.status(200).json({ message: "Commande finalisée." });
      } catch (error) {
         res.status(500).json({
            message: 'Il y a eu un problème.',
            err: 'Il y a eu un problème.' });
      }
}

export const delete_commande = async (req, res) => {
      try {
         await Commande.delete(req.params.commandeId, req.session.user.id);
         res.status(200).json({ message: "Commande supprimée." });
      } catch (error) {
         res.status(500).json({
            message: 'Il y a eu un problème.',
            err: 'Il y a eu un problème.' });
      }
}
