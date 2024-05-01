import { pool } from "../database/config.js";
import { compareSync, hash } from "bcrypt";

class User {

   static create(username, password) {
      return hash(password, 10, (err, pass) => {
         if (err) throw err
         return pool.execute("INSERT INTO user (username, password) VALUES (?, ?)", [username, pass]);
      });
   }

   static login(username, password){
      return pool.execute("SELECT * FROM user WHERE username = ?", [username])
         .then(([rows]) => {
            if (!rows[0].password || !compareSync(password, rows[0].password)) {
               throw new Error('Mauvais identifiants');
            }
            return rows[0];
         })
   }

   static findByEmail(email){
      return pool.execute("SELECT * FROM user WHERE email = ?", [email])
         .then(([rows]) => {
            return rows[0];
         })
   }
}

export default User;