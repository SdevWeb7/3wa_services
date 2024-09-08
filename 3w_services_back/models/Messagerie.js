import { pool } from "../database/config.js";

class Messagerie {

      static async getAll(toUserId) {
            const result = await pool.execute(`
             SELECT m.id, m.subject, m.content, m.created_at,
                    sender.pseudonyme as sender_pseudonyme, sender.id as sender_id
             FROM messagerie as m
             JOIN user as sender on sender.id = from_user_id
             WHERE to_user_id = ?`,
               [toUserId]);

            return result[0];
      }

      static async sendMessage(fromUserId, toUserId, subject, content) {
            await pool.execute(`
              INSERT INTO messagerie
              (from_user_id, to_user_id, subject, content, created_at)
              VALUES (?, ?, ?, ?, NOW())`,
               [fromUserId, toUserId, subject, content]);
      }

      static async delete(messageId, userId) {
            await pool.execute(`
               DELETE FROM messagerie
                WHERE id = ?
                AND to_user_id = ?`,
               [messageId, userId]);
      }
}

export default Messagerie;
