import express from 'express';
import path from 'path';
import 'dotenv/config';
import router from "./router/routes.config.js";
import favicon from 'express-favicon';
import cors from 'cors';
import { configSession } from "./config/session.config.js";



const app = express();
const PORT = process.env.PORT_BACKEND;

app.use(configSession);


app.use(cors({
   origin: process.env.URL_SERVER_FRONT,
   credentials: true
}))


app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(router);


app.listen(PORT, () => {
   console.log('Server is running on http://localhost:' + PORT);
});