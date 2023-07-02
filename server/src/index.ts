import express from 'express';
import { config } from 'dotenv'; config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dbConnection } from './database';
import { AuthRouter, AdminProductsRouter, AdminOrdersRouter, AdminUserRouter, StorefrontOrdersRouter, StorefrontProductsRouter, StorefrontFiltersRouter } from './routes';

const app = express();

// DB Conn
dbConnection();

// Config
app.use(cors({
  origin: [ 
    'http://localhost:4000', 
    'http://localhost:4040', 
    'http://127.0.0.1', 
    'http://104.142.122.231', 
    'https://gymrat-nextjs.vercel.app', 
    'https://gymrat-8q7k.onrender.com' 
  ],
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', AuthRouter);

app.use('/api/admin/products', AdminProductsRouter);
app.use('/api/admin/users', AdminUserRouter);
app.use('/api/admin/orders', AdminOrdersRouter);

app.use('/api/storefront/user', StorefrontOrdersRouter);
app.use('/api/storefront/products', StorefrontProductsRouter);
app.use('/api/storefront/filters', StorefrontFiltersRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in port ${ process.env.SERVER_PORT }`);
});
