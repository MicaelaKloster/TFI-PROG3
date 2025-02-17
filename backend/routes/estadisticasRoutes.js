import express from 'express';
import EstadisticasController from '../controllers/estadisticasController.js';


const router = express.Router();

// Ruta para obtener las estadísticas
router.get("/obtener", EstadisticasController.getEstadisticasCompletas);

export default router;