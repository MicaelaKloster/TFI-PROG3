import oficinaController from "../controllers/oficinaController.js";
import express from 'express';

const router = express.Router();

// Ruta para obtener todas las oficinas
router.get('/obtener', oficinaController.getAllOficinas);

// Ruta para obtener empleados asignados a una oficina
router.get('/:idOficina/empleados', oficinaController.getEmpleadosByOficina);

// Ruta para asignar un empleado a una oficina
router.post('/:idOficina/empleado/:idUsuario', oficinaController.asignarEmpleadoAOficina);

// Ruta para eliminar (desactivar) un empleado de una oficina
router.post('/empleado/:idUsuario', oficinaController.eliminarEmpleadoDeOficina);

export default router;