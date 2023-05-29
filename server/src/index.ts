import express from 'express';
import { config } from 'dotenv'; config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dbConnection } from './database';
import { AuthRouter, OrdersRouter, ProductsRouter, SearchRounter, UserRouter } from './routes';

const app = express();

// DB Conn
dbConnection();

// Config
app.use(cors({
  origin: [ 'http://localhost:4000', 'http://localhost:4040', 'http://127.0.0.1', 'http://104.142.122.231' ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/products', ProductsRouter);
app.use('/api/orders', OrdersRouter);
app.use('/api/search', SearchRounter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in port ${ process.env.SERVER_PORT }`);
});
