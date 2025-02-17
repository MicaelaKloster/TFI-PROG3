import estadisticas from "../database/estadisticasDB.js";

const EstadisticasService = {
  // Obtener estadísticas
  getEstadisticasCompletas: async () => {
    try {
      const resultados = await estadisticas.getEstadisticasCompletasDB();

      return resultados;
      
    } catch (error) {
      console.error("Error al obtener estadísticas completas", error);
      throw error; // Propaga el error para manejarlo en el controlador
    }
  }
};

export default EstadisticasService;