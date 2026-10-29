import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authMiddleware from './middlewares/authMiddleware.js';

import authRouter from './routes/authRoutes.js';
import contactRouter from './routes/contactRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/contacts",authMiddleware,contactRouter);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log(error));

app.listen(process.env.PORT,()=>{
    console.log(`Running Server on ${process.env.PORT}`)
})