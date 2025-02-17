import express from 'express';
import informeController from '../controllers/informeController.js';


const router = express.Router();

// Ruta para obtener informe (PDF o CSV)
router.get("/informe", informeController.informe);

export default router;