import { pool } from "../database/config.js";
import { compareSync, hash } from "bcrypt";

class User {

   static create(email, password) {
      return new Promise((resolve, reject) => {
         hash(password, 10, async (err, pass) => {
            if (err) reject(err);
            try {
               const [result] = await pool.execute("INSERT INTO user (email, password, created_at) VALUES (?, ?, NOW())", [email, pass]);
               resolve(result);
            } catch (error) {
               reject(error);
            }
         });
      });
   }

   static login(email, password){
      return new Promise(async (resolve, reject) => {
         try {
            const result = await User.findByEmailWithPassword(email);
            if (!result.password || !compareSync(password, result.password)) {
               throw new Error('Mauvais identifiants');
            }
            resolve(result);
         } catch (error) {
            reject(error);
         }
      });
   }

   static findById(id){
      return new Promise(async (resolve, reject) => {
         try {
            const result = await pool.execute("SELECT id, email, sold, services_rendered, created_at FROM user WHERE id = ?", [id]);
            resolve(result[0][0]);
         } catch (error) {
            reject(error);
         }
      });
   }

   static findByEmail(email){
      return new Promise(async (resolve, reject) => {
            try {
               const result = await pool.execute("SELECT id, email, sold, services_rendered, created_at FROM user WHERE email = ?", [email]);
               resolve(result[0][0]);
            } catch (error) {
               reject(error);
            }
         });
   }

   static findByEmailWithPassword(email){
      return new Promise(async (resolve, reject) => {
         try {
            const result = await pool.execute("SELECT id, email, password, sold, services_rendered, created_at FROM user WHERE email = ?", [email]);
            resolve(result[0][0]);
         } catch (error) {
            reject(error);
         }
      });
   }

   static findByIdWithPassword(id){
      return new Promise(async (resolve, reject) => {
         try {
            const result = await pool.execute("SELECT id, email, password, sold, services_rendered, created_at FROM user WHERE id = ?", [id]);
            resolve(result[0][0]);
         } catch (error) {
            reject(error);
         }
      });
   }

   static deleteUser(id){
      return new Promise(async (resolve, reject) => {
         try {
            const result = await pool.execute("DELETE FROM user WHERE id = ?", [id]);
            resolve(result);
         } catch (error) {
            reject(error);
         }
      });
   }

   static editUser(id, password){
      return new Promise(async (resolve, reject) => {
         try {
            hash(password, 10, async (err, pass) => {
               if (err) reject(err);
               try {
                  const result = await pool.execute("UPDATE user set password = ? WHERE id = ?", [pass, id]);
                  resolve(result);
               } catch (error) {
                  reject(error);
               }
            });
         } catch (error) {
            reject(error);
         }
      });
   }

}

export default User;