import { pool } from "../database/config.js";

class Service {

      static async addService (datas) {
         const result = await pool.execute('INSERT INTO service (title, description, cost, duration, category, user_id) VALUES (?, ?, ?, ?, ?, ?)', datas);

         return result[0];
      }
}


export default Service;