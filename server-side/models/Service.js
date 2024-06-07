import { pool } from "../database/config.js";


class Service {

      static async allServices (perPage, offset, userId, searchKey) {
         const formattedSearchKey = `%${searchKey}%`;
         const totalServices = await pool.execute(`
            SELECT COUNT(id) AS total FROM service 
            WHERE user_id != ?
            AND (title LIKE ? OR description LIKE ?)`,
            [userId, formattedSearchKey, formattedSearchKey]);

         const services = await pool.execute(`
            SELECT s.id, s.title,
                   s.description, s.cost, s.duration,
                   s.created_at, s.img_src,
            u.id as user_id, u.email, u.services_rendered, u.pseudonyme,
            c.name as category_name
            FROM service as s 
            JOIN user as u ON u.id = s.user_id
            JOIN category as c ON c.id = s.category_id
            WHERE user_id != ?
            AND (s.title LIKE ? OR s.description LIKE ?)
            AND isReported = 0
            ORDER BY s.created_at DESC LIMIT ? OFFSET ?`,
            [userId, formattedSearchKey, formattedSearchKey,
               String(perPage), String(offset)]);

         return [services[0], totalServices[0][0].total];
      }

      static async addService (datas) {
         const result = await pool.execute(`
            INSERT INTO service 
            (title, description, cost,
             duration, category_id, created_at,
             user_id, img_src)
            VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`,
            datas);

         const [category] = await pool.execute(`
            SELECT name FROM category
            WHERE id = ?`,
            [datas[4]]);


         return [result[0], category[0]];
      }

      static async allUserServices (userId) {
         const [services] = await pool.execute(`
            SELECT s.id, s.title, c.name as category_name
            FROM service as s
            JOIN category as c ON c.id = s.category_id
            WHERE user_id = ?`,
            [userId]);

         const [categories] = await pool.execute(`SELECT id, name FROM category`);

         return [services, categories];
      }

      static async deleteService (id, userId) {
         await pool.execute(`
            DELETE FROM service
            WHERE id = ? AND user_id = ?`,
            [id, userId]);
      }

      static async getServiceImg (id) {
         const [service] = await pool.execute(`
            SELECT img_src FROM service
            WHERE id = ?`,
            [id]);

         return service[0];
      }

      static async reportService (id) {
         await pool.execute(`
            UPDATE service
            SET isReported = 1
            WHERE id = ?`,
            [id]);
      }

}


export default Service;