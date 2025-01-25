import oficinaController from "../controllers/oficinaController.js";
import express from 'express';

const router = express.Router();

// Rutas de oficina
router.get('/obtener', oficinaController.getAllOficinas);
router.get('/:idOficina/empleados', oficinaController.getEmpleadosByOficina);
router.post('/:idOficina/empleado/:idUsuario', oficinaController.asignarEmpleadoAOficina);
router.post('/empleado/:idUsuario', oficinaController.eliminarEmpleadoDeOficina);

export default router;