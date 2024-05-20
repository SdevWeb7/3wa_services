import { pool } from "../database/config.js";

class Service {

      static async allServices () {
         const services = await pool.execute('SELECT * FROM service');

         return services[0];
      }

      static async addService (datas) {
         const result = await pool.execute('INSERT INTO service (title, description, cost, duration, category, created_at, user_id) VALUES (?, ?, ?, ?, ?, NOW(), ?)', datas);

         return result[0];
      }

      static async allUserServices (userId) {
         const [services] = await pool.execute('SELECT * FROM service WHERE user_id = ?', [userId]);

         return services;
      }

      static async deleteService (id) {
         const result = await pool.execute('DELETE FROM service WHERE id = ?', [id]);

         return result[0];
      }
}


export default Service;