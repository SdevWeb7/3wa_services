import Service from "../models/Service.js";
import { upload } from "../config/images.config.js";
import fs from "fs";
import path from "path";

const PER_PAGE = 5;

export const all_services = async (req, res) => {
   const offset = req.query.page ? (req.query.page - 1) * PER_PAGE : 0;
   const userId = req.session.user ? req.session.user.id : '';
   try {
      const [services, totalServices] = await Service.allServices(PER_PAGE, offset, userId);
      res.json([services, totalServices]);

   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }
}

export const add_service = async (req, res) => {
   upload(req, res, async (err) => {
      if (err) {
         return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
      }
      const { title, description, cost, duration, category } = JSON.parse(req.body.data);
      const imageSrc = req.file ? req.file.filename : 'http://via.placeholder.com/640x360';

      if (!title || !description || !cost || !duration || !category) {
         return res.status(400).json({message: "Champs manquants", err: 'Champs manquants'});
      }

      const datas = [title, description, cost, duration, category, req.session.user.id, imageSrc];

      const result = await Service.addService(datas);

      if (!result.affectedRows) {
         return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
      }

      res.json({
         message: "Le service a bien été ajouté",
         service: { id: result.insertId, title, description, cost, duration, category }});
   });
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
   try {
      const service = await Service.getService(req.params.serviceId);
      if (service.img_src !== 'http://via.placeholder.com/640x360') {
         const pathImage = path.join(process.cwd(), 'public', 'img', service.img_src);
         fs.stat(pathImage, async(err, stats) => {
            if (err) return;
            else {
               await fs.unlink(pathImage, (err) => {
                  if (err) {
                     return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
                  }
               });
            }
         });
      }
      await Service.deleteService(req.params.serviceId, req.session.user.id);
      res.json({message: "Le service a bien été supprimé"});
   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }
}