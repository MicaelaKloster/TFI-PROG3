import EstadisticasService from '../services/estadisticasService.js';

const EstadisticasController = {
    getEstadisticasCompletas: async (req, res) => {
        try {
          // Llama al servicio
          const estadisticas = await EstadisticasService.getEstadisticasCompletas();
          
          // Responde con los datos obtenidos
          res.json(estadisticas);
        } catch (error) {
          console.error("Error al obtener estadísticas completas de reclamos", error);
          res.status(500).json({ error: "Error al obtener estadísticas completas de reclamos" });
        }
    },

};


export default EstadisticasController;