import express from 'express';
import ReclamoController from '../controllers/reclamoController.js';

const router = express.Router();

// Rutas de Reclamo
router.get('/estado', ReclamoController.obtenerReclamoEstado);
router.post('/crear', ReclamoController.crearReclamo);
router.put("/:idReclamo/cancelar", ReclamoController.cancelarReclamo);
router.get('/listar-paginado', ReclamoController.getReclamosPaginados);

export default router;