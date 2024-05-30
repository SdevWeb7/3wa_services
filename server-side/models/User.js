import { pool } from "../database/config.js";
import { compareSync, hash, hashSync } from "bcrypt";

class User {

   static async create(email, password, pseudonyme){
      const result = await User.findByEmailOrPseudo(email, pseudonyme);
      if (result) throw new Error('Problème interne.');

      const hashResult = await hashSync(password, 10);

      const result2 = await pool.execute(`
         INSERT INTO user (email, password, pseudonyme, created_at)
         VALUES (?, ?, ?, NOW())`,
         [email, hashResult, pseudonyme]);

      const newUser = await User.findById(result2[0].insertId);
      return newUser;
   }

   static async login(email, password){
         const result = await User.findByEmailWithPassword(email);

         if (!result.password || !compareSync(password, result.password)) {
            throw new Error('Mauvais identifiants');
         }

         return {
            id: result.id,
            email: result.email,
            pseudonyme: result.pseudonyme,
            isBanned: result.isBanned,
            sold: result.sold,
            services_rendered: result.services_rendered,
            created_at: result.created_at
         };
   }


   static async deleteUser(id){
         const result = await pool.execute(`
            DELETE FROM user
            WHERE id = ?`,
            [id]);
         return result;
   }

   static editUser(id, password){
         hash(password, 10, async (err, pass) => {
            if (err) throw err;

            await pool.execute(`
                UPDATE user set password = ?
                WHERE id = ?`,
               [pass, id]);
         });
   }


   static async findById(id){
      const result = await pool.execute(`
         SELECT id, email, pseudonyme, sold,
                services_rendered, created_at, isBanned
         FROM user WHERE id = ?`,
         [id]);
      return result[0][0];
   }

   static async findByEmailOrPseudo(email, pseudonyme){
      const result = await pool.execute(`
         SELECT id
         FROM user WHERE email = ? OR pseudonyme = ?`,
         [email, pseudonyme]);
      return result[0][0];
   }

   static async findByEmailWithPassword(email){
      const result = await pool.execute(`
         SELECT *
         FROM user WHERE email = ?`,
         [email]);
      return result[0][0];
   }

   static async findPasswordById(id){
      const result = await pool.execute(`
         SELECT password
         FROM user WHERE id = ?`,
         [id]);
      return result[0][0];
   }
}

export default User;