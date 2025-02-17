import express from 'express';
import ReclamosTipoController from '../controllers/reclamosTipoController.js';

const router = express.Router();

// Ruta para obtener los tipos de reclamos
router.get("/obtener", ReclamosTipoController.getAllReclamosTipo);

// Ruta para crear un nuevo tipo de reclamo
router.post("/crear", ReclamosTipoController.crearReclamoTipo);

// Ruta para actualizar un tipo de reclamo por su ID 
router.patch("/actualizar/:idReclamoTipo", ReclamosTipoController.actualizarReclamoTipo);

// Ruta para borrar (desactivar) un tipo de reclamo
router.put("/borrar/:idReclamoTipo", ReclamosTipoController.borrarReclamoTipo);

export default router;