import { Admin } from "../models/Admin.js";

export const adminDashboard = async (req, res) => {
   try {
      const services = await Admin.getReportedServices();
      res.json(services);
   } catch (err) {
      res.json({
         message: 'Une erreur est survenue.',
         err: 'Une erreur est survenue.' });
   }
}

export const deleteReportedService = async (req, res) => {
   try {
      await Admin.deleteReportedService(req.params.serviceId);
      res.json({message: 'Service supprimé.'});
   } catch (err) {
      res.json({
         message: 'Une erreur est survenue.',
         err: 'Une erreur est survenue.' });
   }
}

export const restoreReportedService = async (req, res) => {
   try {
      await Admin.restoreReportedService(req.params.serviceId);
      res.json({message: 'Service restauré.'});
   } catch (err) {
      console.log(err)
      res.json({
         message: 'Une erreur est survenue.',
         err: 'Une erreur est survenue.' });
   }
}

export const banUser = async (req, res) => {
   try {
      await Admin.banUser(req.params.userId);
      res.json({message: 'Utilisateur banni.'});
   } catch (err) {
      res.json({
         message: 'Une erreur est survenue.',
         err: 'Une erreur est survenue.' });
   }
}