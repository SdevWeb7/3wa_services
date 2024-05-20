import { pool } from "../database/config.js";

class Service {

      static async addService (datas) {
         const result = await pool.execute('INSERT INTO service (title, description, cost, duration, category, created_at, user_id) VALUES (?, ?, ?, ?, ?, NOW(), ?)', datas);

         return result[0];
      }
}


export default Service;