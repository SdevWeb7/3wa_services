import { pool } from "../database/config.js";

export class Admin {

   static async getReportedServices () {
      const services = await pool.execute(`
            SELECT s.id, s.title, s.description, s.img_src,
                   u.id as user_id, u.email
            FROM service as s
            JOIN user as u ON u.id = s.user_id
            WHERE isReported = 1`,
         []);

      return services[0];
   }

   static async deleteReportedService (id) {
      await pool.execute(`
            DELETE FROM service
            WHERE id = ?`,
         [id]);
   }

   static async restoreReportedService (id) {
      try {

      await pool.execute(`
            UPDATE service
            SET isReported = 0
            WHERE id = ?`,
         [id]);
      } catch (e) {
         console.error(e);
      }
   }

   static async banUser (id) {
      await pool.execute(`
            UPDATE user
            SET isBanned = 1
            WHERE id = ?`,
         [id]);
   }
}