import express from 'express';
import ReclamosTipoController from '../controllers/reclamosTipoController.js';

const router = express.Router();

// Rutas de ReclamoTipo
router.get("/obtener", ReclamosTipoController.getAllReclamosTipo);
router.post("/crear", ReclamosTipoController.crearReclamoTipo);
router.patch("/actualizar/:idReclamoTipo", ReclamosTipoController.actualizarReclamoTipo);
router.put("/borrar/:idReclamoTipo", ReclamosTipoController.borrarReclamoTipo);

export default router;