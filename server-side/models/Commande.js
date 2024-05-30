import { pool } from "../database/config.js";

export class Commande {

   static async add(fromUserId, serviceId, forDateTime, toUserId) {
      const [service] = await pool.execute(`
       SELECT cost FROM service WHERE id = ?`, [serviceId]);

      const [user] = await pool.execute(`
        SELECT sold FROM user WHERE id = ?`, [fromUserId]);

      if (user[0].sold < service[0].cost) return;

      await pool.execute(`
          INSERT INTO orders
          (from_user_id, service_id, status, created_at, start_date, to_user_id)
          VALUES (?, ?, "En cours", NOW(), ?, ?)`, [fromUserId, serviceId, forDateTime, toUserId]);
   }


   static async all(userId) {
      const commandesPasses = await pool.execute(`
        SELECT o.id, o.service_id, o.status, o.created_at, o.start_date, u.email as user_email, s.title, s.description
        FROM orders as o
        JOIN user as u ON to_user_id = u.id
        JOIN service as s ON s.id = o.service_id
        WHERE from_user_id = ?`, [userId]);


      const commandesRecues = await pool.execute(`
          SELECT o.id, o.service_id, o.status, o.created_at, o.start_date, o.from_user_id as user_id, u.email as user_email, s.title, s.description, s.cost
          FROM orders as o
          JOIN user as u ON from_user_id = u.id
          JOIN service as s ON s.id = o.service_id
          WHERE to_user_id = ?`, [userId]);
      return [commandesPasses[0], commandesRecues[0]];

   }


   static async finaliser(commandeId, toUserId, cost, fromUserId) {
      await pool.execute(`
         UPDATE user
         set services_rendered = services_rendered + 1, sold = sold + ?
         WHERE id = ?`, [cost, toUserId]);

      await pool.execute(`
         UPDATE user
         set sold = sold - ?
         WHERE id = ?`, [cost, fromUserId]);

      await pool.execute(`
        UPDATE orders
        SET status = "Finalisée"
        WHERE id = ? AND to_user_id = ?`, [commandeId, toUserId]);
   }

   static async delete(commandeId, userId) {
      await pool.execute(`
         DELETE FROM orders
         WHERE id = ? AND (to_user_id = ? OR from_user_id = ?)`, [commandeId, userId, userId]);
   }
}