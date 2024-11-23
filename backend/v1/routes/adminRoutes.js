import express from 'express';
import AdminController from '../controllers/adminController.js';
// import upload from '../config/multerConfig.js';

const router = express.Router();

// Rutas de Admin
router.get("/empleados", AdminController.getAllEmpleados);
router.get("/clientes", AdminController.getAllClientes);
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

export default router;