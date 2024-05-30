import Messagerie from "../models/Messagerie.js";


export const all_messages = async (req, res) => {
   try {
      const messages = await Messagerie.getAll(req.session.user.id)
      res.json(messages);
   } catch (error) {
      res.status(500).json({
         message: "Erreur serveur",
         err: "Erreur serveur"});
   }
}


export const send_message = async (req, res) => {
   const { toUserId, subject, content } = req.body;
   try {
      await Messagerie.sendMessage(req.session.user.id, toUserId, subject, content)
      res.json({message: "Send message"});
   } catch (error) {
      res.status(500).json({
         message: "Erreur serveur",
         err: "Erreur serveur"});
   }
}


export const delete_message = async (req, res) => {
   try {
      await Messagerie.delete(req.params.messageId, req.session.user.id);
      res.json({message: "Message supprimé"});
   } catch (error) {
      res.status(500).json({
         message: "Erreur serveur",
         err: "Erreur serveur"});
   }
}