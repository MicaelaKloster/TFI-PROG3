import express from 'express';
import EstadisticasController from '../controllers/estadisticasController.js';


const router = express.Router();

router.get("/obtener", EstadisticasController.getEstadisticasCompletas);


export default router;