import express from 'express';
import path from 'path';
import 'dotenv/config';
import session from "express-session";
import { createRequire } from 'module';
import { securityMiddleware } from "./middlewares/securityMiddleware.js";
import { router } from "./router/routes.config.js";
import favicon from 'express-favicon';
import cors from 'cors';
import { pool } from "./database/config.js";

const require = createRequire(import.meta.url);
const mySQLStore = require('express-mysql-session')(session);

const app = express();
const PORT = 3000;

app.use(session({
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
   })
);

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))

app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Middlewares custom
// app.use(securityMiddleware);
app.use((req, res, next) => {
   console.log(req.session);
   next();
});

//Routes
app.use(router);


app.listen(PORT, () => {
   console.log('Server is running on http://localhost:' + PORT);
});