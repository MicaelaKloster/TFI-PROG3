import express from 'express';
import AdminController from '../controllers/adminController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Rutas para obtener empleados y clientes
router.get("/empleados", AdminController.getAllEmpleados);
router.get("/clientes", AdminController.getAllClientes);

// CRUD de usuarios
router.post(
    "/usuario",
    upload.single('imagen'),
    AdminController.crearUsuario
);
router.patch(
    "/actualizar-usuario/:idUsuarioModificado",
    upload.single('imagen'),
    AdminController.actualizarUsuario
);
router.put("/borrar-usuario/:idUsuario", AdminController.borrarUsuario);

// Estadísticas de usuarios por oficina
router.get('/usuarios-por-oficina', AdminController.obtenerUsuariosPorOficina);


export default router;