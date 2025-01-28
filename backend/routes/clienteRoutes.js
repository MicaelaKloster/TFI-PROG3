import express from 'express';
import ClienteController from '../controllers/clienteController.js';
import upload from '../config/multerConfig.js';
import passport from 'passport';
import autorizarUsuario from '../middleware/autorizarUsuario.js';
import validarCliente from '../middleware/validarCliente.js';

const router = express.Router();

// Rutas Cliente
router.post(
    '/crear',
    upload.single('imagen'),
    validarCliente,
    ClienteController.crearCliente
);

router.patch(
    '/actualizar',
    passport.authenticate('jwt', {session: false}),
    autorizarUsuario([3]),
    upload.single('imagen'),
    ClienteController.actualizarCliente
);

export default router;