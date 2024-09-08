import Service from "../models/Service.js";
import { upload } from "../config/images.config.js";
import fs from "fs";
import path from "path";

const PER_PAGE = 5;

export const all_services = async (req, res) => {
   try {
      const offset = req.query.page ? (req.query.page - 1) * PER_PAGE : 0;
      const userId = req.session.user ? req.session.user.id : '';
      const searchKey = req.query.searchKey ? req.query.searchKey : '';
      const [services, totalServices] = await Service.allServices(PER_PAGE, offset, userId, searchKey);
      res.json([services, totalServices]);
   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }
}

export const add_service = async (req, res) => {
   upload(req, res, async (err) => {
      if (err) {
         return res.status(500).json({
            message: "Erreur interne",
            err: 'Erreur interne'});
      }
      const { title, description, cost, duration, categoryId } = JSON.parse(req.body.data);
      const imageSrc = req.file?.filename ? req.file.filename : 'http://via.placeholder.com/640x360';

      if (!title || !description || !cost || !duration || !categoryId) {
         return res.status(400).json({
            message: "Champs manquants",
            err: 'Champs manquants'});
      }

      const datas = [title, description, cost, duration, categoryId, req.session.user.id, imageSrc];
      const [result, category] = await Service.addService(datas);

      if (!result?.affectedRows) {
         return res.status(500).json({
            message: "Erreur interne",
            err: 'Erreur interne'});
      }

      res.json({
         message: "Le service a bien été ajouté",
         service: { id: result.insertId, title, category_name: category.name }});
   });
}


export const user_services = async (req, res) => {
   if (!req.session.user) {
      return res.status(401).json({message: "Non autorisé", err: 'Non autorisé'});
   }
   try {
      const [services, categories] = await Service.allUserServices(req.session.user.id);
      res.json([services, categories]);
   } catch (err) {
      return res.status(500).json({message: "Erreur interne", err: 'Erreur interne'});
   }
}


export const delete_service = async (req, res) => {
   try {
      const service = await Service.getServiceImg(req.params.serviceId);
      if (service.img_src !== 'http://via.placeholder.com/640x360') {
         const pathImage = path.join(process.cwd(), 'public', 'img', service.img_src);
         fs.stat(pathImage, async(err, stats) => {
            if (err) return;
            else {
               await fs.unlink(pathImage, (err) => {
                  if (err) {
                     return res.status(500).json({
                        message: "Erreur interne",
                        err: 'Erreur interne'});
                  }
               });
            }
         });
      }
      await Service.deleteService(req.params.serviceId, req.session.user.id);
      res.json({message: "Le service a bien été supprimé"});
   } catch (err) {
      return res.status(500).json({
         message: "Erreur interne",
         err: 'Erreur interne'});
   }
}


export const report_service = async (req, res) => {
   try {
      await Service.reportService(req.params.serviceId);
      res.json({message: "Le service a bien été signalé"});
   } catch (err) {
      return res.status(500).json({
         message: "Erreur interne",
         err: 'Erreur interne'});
   }
}