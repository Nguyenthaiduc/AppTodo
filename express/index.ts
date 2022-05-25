import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.listen(port,()=> {
    console.log(`server listening  on port ${port}`)
})