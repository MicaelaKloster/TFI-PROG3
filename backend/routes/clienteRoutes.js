import express from 'express';
import ClienteController from '../controllers/clienteController.js';
import upload from '../config/multerConfig.js';
import passport from 'passport';
import autorizarUsuario from '../middleware/autorizarUsuario.js';
import validarCliente from '../middleware/validarCliente.js';

const router = express.Router();

// Ruta para registar un cliente (solo accesible por usuarios autenticados y autorizados)
router.post(
    '/crear',
    upload.single('imagen'),
    validarCliente,
    ClienteController.crearCliente
);

// Ruta para actualizar un cliente (solo un cliente puede hacerlo)
router.patch(
    '/actualizar',
    passport.authenticate('jwt', {session: false}),
    autorizarUsuario([3]),
    upload.single('imagen'),
    ClienteController.actualizarCliente
);


export default router;