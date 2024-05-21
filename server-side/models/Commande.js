import { pool } from "../database/config.js";

export class Commande {

   static async add(fromUserId, serviceId, forDateTime, toUserId) {

      await pool.execute('INSERT INTO transaction_status (from_user_id, service_id, status, created_at, start_date, to_user_id) VALUES (?, ?, "En cours", NOW(), ?, ?)', [fromUserId, serviceId, forDateTime, toUserId]);
   }


   static async all(userId) {

      const commandesPasses = await pool.execute('SELECT ts.id, ts.service_id, ts.status, ts.created_at, ts.start_date, u.email as user_email, s.title, s.description FROM transaction_status as ts JOIN user as u ON to_user_id = ? JOIN service as s ON s.id = ts.service_id WHERE from_user_id = ?', [userId, userId]);

      const commandesRecues = await pool.execute('SELECT ts.id, ts.service_id, ts.status, ts.created_at, ts.start_date, u.email as user_email, s.title, s.description FROM transaction_status as ts JOIN user as u ON from_user_id = ? JOIN service as s ON s.id = ts.service_id WHERE to_user_id = ?', [userId, userId]);

      return [commandesPasses[0], commandesRecues[0]];
   }


   // static async finaliser(commandeId) {
   //
   //    await pool.execute('UPDATE transaction_status SET status = "Finalisée" WHERE id = ?', [commandeId]);
   // }
   //
   // static async delete(commandeId) {
   //
   //    await pool.execute('DELETE FROM transaction_status WHERE id = ?', [commandeId]);
   // }
}