import ReclamosRepuestosService from "../services/reclamosRepuestosService.js";

const ReclamosRepuestosController = {
  asociarRepuesto: async (req, res) => {
    try {
      const { idReclamo, idRepuesto } = req.body;
      const resultado = await ReclamosRepuestosService.asociarRepuesto(idReclamo, idRepuesto);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  obtenerRepuestosPorReclamo: async (req, res) => {
    try {
      const { idReclamo } = req.params;
      const repuestos = await ReclamosRepuestosService.obtenerRepuestosPorReclamo(idReclamo);
      res.status(200).json(repuestos);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // obtenerRepuestoMasUtilizado: async (req, res) => {
    // try {
      // const repuesto = await ReclamosRepuestosService.obtenerRepuestoMasUtilizado();
      // res.status(200).json(repuesto);
    // } catch (error) {
      // res.status(404).json({ error: error.message });
    // }
  // },
  
  // Obtener el/los repuestos más utilizado/s
  obtenerRepuestoMasUtilizado: async (req, res) => {
	try {
      const resultado = await ReclamosRepuestosService.obtenerRepuestoMasUtilizado();
      res.status(200).json(resultado);
    } catch (error) {
      console.error("Error al obtener el repuesto más utilizado:", error);
      res.status(500).json({ error: "Error al obtener el repuesto más utilizado." });
    }
  },
};


export default ReclamosRepuestosController;