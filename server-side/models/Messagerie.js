import { pool } from "../database/config.js";

class Messagerie {

      static async getAll(toUserId) {
            const result = await pool.execute('SELECT m.id, m.subject, m.content, m.created_at, sender.email as sender_email, sender.id as sender_id FROM messagerie as m JOIN user as sender on sender.id = from_user_id WHERE to_user_id = ?', [toUserId]);

            return result[0];
      }

      static async sendMessage(fromUserId, toUserId, subject, content) {
            await pool.execute('INSERT INTO messagerie (from_user_id, to_user_id, subject, content, created_at) VALUES (?, ?, ?, ?, NOW())', [fromUserId, toUserId, subject, content]);
      }

      static async delete(messageId, userId) {
            const message = await pool.execute('SELECT * FROM messagerie WHERE id = ?', [messageId]);

            if (message[0][0].to_user_id !== userId) {
                  throw new Error('Vous ne pouvez pas supprimer ce message');
            }
            await pool.execute('DELETE FROM messagerie WHERE id = ?', [messageId]);
      }
}

export default Messagerie;
