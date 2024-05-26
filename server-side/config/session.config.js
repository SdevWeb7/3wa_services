import session from "express-session";
import { pool } from "../database/config.js";
import { createRequire } from "module";


const require = createRequire(import.meta.url);
const mySQLStore = require('express-mysql-session')(session);


export const configSession = session({
   name: 'session_id',
   secret: process.env.APP_SECRET,
   resave: false,
   saveUninitialized: false,
   store: new mySQLStore({
      clearExpired: true,
      checkExpirationInterval: 900000, // 15 minutes
      expiration: 1000 * 60 * 60 * 24 * 7,
   }, pool),
   cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
   },
   rolling: true
});