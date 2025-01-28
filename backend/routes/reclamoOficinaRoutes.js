import express from 'express';
import ReclamoOficinaController from '../controllers/reclamoOficinaController.js';

const router = express.Router();

// Obtener reclamos asociados a la oficina del empleado
router.get(
  "/listar",
  ReclamoOficinaController.listarReclamosOficina,
);

// Actualizar estado de un reclamo
router.put(
  "/cliente/:idCliente/reclamo/:idReclamo/estado/:nuevoEstado",
  ReclamoOficinaController.ActualizarEstadoReclamo
);

export default router;