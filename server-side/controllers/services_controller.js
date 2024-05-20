import Service from "../models/Service.js";


export const all_services = async (req, res) => {
   try {
      const services = await Service.allServices();
      res.json(services);

   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }

}

export const add_service = async (req, res) => {

   const { title, description, cost, duration, category } = req.body;

   if (!title || !description || !cost || !duration || !category) {
      return res.status(400).json({message: "Champs manquants", err: 'Champs manquants'});
   }

   const datas = [title, description, cost, duration, category, req.session.user.id];

   const result = await Service.addService(datas);

   if (!result.affectedRows) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }

   res.json({message: "Le service a bien été ajouté", service: { id: result.insertId, title, description, cost, duration, category }});
}


export const user_services = async (req, res) => {

   if (!req.session.user) {
      return res.status(401).json({message: "Non autorisé", err: 'Non autorisé'});
   }
   try {
      const services = await Service.allUserServices(req.session.user.id);
      res.json(services);
   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }

}


export const delete_service = async (req, res) => {
   if (!req.session.user || (req.session.user.id !== Number(req.params.userId))) {
      return res.status(401).json({message: "Non autorisé", err: 'Non autorisé'});
   }
   try {
      await Service.deleteService(req.params.id);
      res.json({message: "Le service a bien été supprimé"});
   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }

}