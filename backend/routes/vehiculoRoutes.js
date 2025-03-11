import express from 'express';
import VehiculosController from "../controllers/vehiculoController.js";

const router = express.Router();

// Obtener todos los vehículos
router.get("/obtener", VehiculosController.getAllVehiculos);

// Crear un nuevo vehículo
router.post("/crear", VehiculosController.crearVehiculo);

// Actualizar un vehículo
router.put("/actualizar/:idVehiculo", VehiculosController.actualizarVehiculo);


export default router;