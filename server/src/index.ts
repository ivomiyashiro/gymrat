import express from 'express';
import { config } from 'dotenv'; config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// DB Conn

// Config
app.use(cors({
  origin: [ 'http://localhost:3000', 'http://127.0.0.1', 'http://104.142.122.231' ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(express.json());
app.use(cookieParser());

// Routes

app.listen(process.env.PORT, () => {
  console.log(`Server running in port ${ process.env.PORT }`);
});