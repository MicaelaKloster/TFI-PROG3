import express from 'express';
import ReclamoController from '../controllers/reclamoController.js';
import passport from 'passport';
import autorizarUsuario from '../middleware/autorizarUsuario.js';

const router = express.Router();

// Ruta para obtener estado de los reclamos de un usuario
router.get('/estado',
	passport.authenticate("jwt", { session: false }),
    autorizarUsuario([3]),
	ReclamoController.obtenerReclamoEstado
);

// Ruta para crear un nuevo reclamo 
router.post('/crear', 
	passport.authenticate("jwt", { session: false }),
    autorizarUsuario([3]),
	ReclamoController.crearReclamo
);

// Ruta para cancelar un reclamo
router.put("/:idReclamo/cancelar",
	passport.authenticate("jwt", { session: false }),
    autorizarUsuario([3]),
	ReclamoController.cancelarReclamo
);

// Ruta para listar los reclamos paginados
router.get('/listar-paginado',
	passport.authenticate("jwt", { session: false }),
    autorizarUsuario([3]),
	ReclamoController.getReclamosPaginados
);

// Ruta para listars los vehiculos por tipo de reclamo
router.get('/listar-vehiculos',
	passport.authenticate("jwt", { session: false }),
    autorizarUsuario([1]),  
	ReclamoController.obtenerVehiculosPorTipoReclamo
);

export default router;