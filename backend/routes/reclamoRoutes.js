import express from 'express';
import ReclamoController from '../controllers/reclamoController.js';

const router = express.Router();

// Ruta para obtener estado de los reclamos de un usuario
router.get('/estado', ReclamoController.obtenerReclamoEstado);

// Ruta para crear un nuevo reclamo 
router.post('/crear', ReclamoController.crearReclamo);

// Ruta para cancelar un reclamo
router.put("/:idReclamo/cancelar", ReclamoController.cancelarReclamo);

// Ruta para listar los reclamos paginados
router.get('/listar-paginado', ReclamoController.getReclamosPaginados);

export default router;