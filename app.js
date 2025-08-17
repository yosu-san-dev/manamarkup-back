import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.get( '/', ( req,res ) => {
    res.send( 'Welcome to the API' );
});

app.listen(PORT, async () => {
    console.log(`subtrack API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});
export default app;