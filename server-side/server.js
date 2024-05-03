import express from 'express';
import path from 'path';
import 'dotenv/config';
import session from "express-session";
import { securityMiddleware } from "./middlewares/securityMiddleware.js";
import { router } from "./router/routes.config.js";
import favicon from 'express-favicon';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))

app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: 'lax'},
      rolling: true
   })
);

//Middlewares custom
app.use(securityMiddleware);

app.use(router);



app.listen(PORT, () => {
   console.log('Server is running on http://localhost:' + PORT);
});