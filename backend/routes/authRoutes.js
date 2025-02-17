import express from 'express';
import { login } from "../controllers/authController.js";

const router = express.Router();

// Ruta inicio de sesión
router.post('/login', login);

export default router;