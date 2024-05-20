import { pool } from "../database/config.js";

class Messagerie {

      static async getAll(toUserId) {
            const result = await pool.execute('SELECT * FROM messagerie WHERE to_user_id = ?', [toUserId]);

            return result[0];
      }

      static async sendMessage(fromUserId, toUserId, subject, content) {
            const result = await pool.execute('INSERT INTO messagerie (from_user_id, to_user_id, subject, content) VALUES (?, ?, ?)', [fromUserId, toUserId, subject, content]);

            return result[0];
      }
}


export default Messagerie;