import { pool } from "../database/config.js";


class Service {

      static async allServices (perPage, offset) {
         const totalServices = await pool.execute('SELECT COUNT(*) AS total FROM service');

         const services = await pool.execute('SELECT s.id, s.user_id, s.title, s.description, s.cost, s.duration, s.category, s.created_at, u.email, u.services_rendered FROM service as s JOIN user as u ON u.id = s.user_id ORDER BY s.created_at DESC LIMIT ? OFFSET ?', [String(perPage), String(offset)]);

         return [services[0], totalServices[0][0].total];
      }

      static async addService (datas) {
         const result = await pool.execute('INSERT INTO service (title, description, cost, duration, category, created_at, user_id) VALUES (?, ?, ?, ?, ?, NOW(), ?)', datas);

         return result[0];
      }

      static async allUserServices (userId) {
         const [services] = await pool.execute('SELECT * FROM service WHERE user_id = ?', [userId]);

         return services;
      }

      static async deleteService (id, userId) {
         const result = await pool.execute('DELETE FROM service WHERE id = ? AND user_id = ?', [id, userId]);

         return result[0];
      }
}


export default Service;