import express from 'express';
import RepuestoController from "../controllers/repuestoController.js";

const router = express.Router();

// Obtener todos los repuestos
router.get("/obtener", RepuestoController.getAllRepuestos);

// Crear un nuevo repuesto
router.post("/crear", RepuestoController.crearRepuesto);

// Actualizar un repuesto
router.put("/actualizar/:idRepuesto", RepuestoController.actualizarRepuesto);

// Eliminar (eliminado físico) de un repuesto
router.delete("/eliminar/:idRepuesto", RepuestoController.borrarRepuesto);

export default router;