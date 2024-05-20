import { pool } from "../database/config.js";
import { compareSync, hash, hashSync } from "bcrypt";

class User {

   static async create(email, password) {
      const result = await User.findByEmail(email);
      if (result) throw new Error('Problème interne.');

      const hashResult = await hashSync(password, 10);

      const result2 = await pool.execute("INSERT INTO user (email, password, created_at) VALUES (?, ?, NOW())", [email, hashResult]);

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
            sold: result.sold,
            services_rendered: result.services_rendered,
            created_at: result.created_at
         };
   }


   static async deleteUser(id){
         const result = await pool.execute("DELETE FROM user WHERE id = ?", [id]);
         return result;
   }

   static editUser(id, password){
         hash(password, 10, async (err, pass) => {
            if (err) throw err;

            await pool.execute("UPDATE user set password = ? WHERE id = ?", [pass, id]);
         });
   }


   static async findById(id){
      const result = await pool.execute("SELECT id, email, sold, services_rendered, created_at FROM user WHERE id = ?", [id]);
      return result[0][0];
   }

   static async findByEmail(email){
      const result = await pool.execute("SELECT id, email, sold, services_rendered, created_at FROM user WHERE email = ?", [email]);
      return result[0][0];
   }

   static async findByEmailWithPassword(email){
      const result = await pool.execute("SELECT id, email, password, sold, services_rendered, created_at FROM user WHERE email = ?", [email]);
      return result[0][0];
   }

   static async findByIdWithPassword(id){
      const result = await pool.execute("SELECT id, email, password, sold, services_rendered, created_at FROM user WHERE id = ?", [id]);
      return result[0][0];
   }
}

export default User;