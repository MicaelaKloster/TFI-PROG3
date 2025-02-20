import express from "express";
import ReclamosRepuestosController from "../controllers/reclamosRepuestosController.js";
import passport from "passport";
import autorizarUsuario from "../middleware/autorizarUsuario.js";

const router = express.Router();

// Asociar repuestos a un reclamo (solo empleados)
router.post(
  "/asociar",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([2]),
  ReclamosRepuestosController.asociarRepuesto
);

// Listar repuestos utilizados en un reclamo (empleados y administradores)
router.get(
  "/listar/:idReclamo",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1, 2]),
  ReclamosRepuestosController.obtenerRepuestosPorReclamo
);

// Obtener el repuesto más utilizado (solo administradores)
router.get(
  "/mas-utilizado",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1]),
  ReclamosRepuestosController.obtenerRepuestoMasUtilizado
);

export default router;
