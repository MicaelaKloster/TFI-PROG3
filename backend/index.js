import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import redis from 'redis';
import passport from 'passport';


// Importar rutas
import routerAdmin from './routes/adminRoutes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta base de la api
const API_VERSION = '/api/v1';

// Configurar redis
const redisClient = redis.createClient({ url: 'redis://127.0.0.1:6379'});
