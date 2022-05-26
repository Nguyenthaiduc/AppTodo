import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routers';
import connection from './db';

dotenv.config();
connection();
const app : Application = express();
const port = process.env.PORT || 5000;

//middleware
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

routes(app);


app.listen(port,()=> {
    console.log(`server listening  on port ${port}`)
})