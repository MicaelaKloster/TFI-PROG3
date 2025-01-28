import pool from "./config.js";

const estadisticas = {
    getEstadisticasCompletasDB: async () => {
      try {
        // Ejecuta el procedimiento almacenado
        const [result] = await pool.query("CALL obtenerEstadisticasCompletas()");
        const datosEstadisticas = {
          // Total de reclamos (primer conjunto de resultados)
          reclamosTotales: result[0][0].totalReclamos,
  
          // Reclamos agrupados por estado (segundo conjunto de resultados)
          reclamosPorEstado: result[1].map(row => ({
            estadoDescripcion: row.estadoDescripcion,
            cantidad: row.cantidad,
          })),
  
          // Reclamos agrupados por tipo (tercer conjunto de resultados)
          reclamosPorTipo: result[2].map(row => ({
            tipoDescripcion: row.tipoDescripcion,
            cantidad: row.cantidad,
          })),
  
          // Tipo de reclamo más frecuente (cuarto conjunto de resultados)
          tipoReclamoFrecuente: result[3][0].tipoReclamoFrecuente,
          cantidadFrecuente: result[3][0].cantidadFrecuente,
  
          // Reclamos por mes y año en el último año (quinto conjunto de resultados)
          reclamosPorMes: result[4].map(row => ({
            anio: row.anio,
            mes: row.mes,
            cantidadMensual: row.cantidadMensual,
          })),
  
          // Reclamos finalizados y no finalizados (sexto conjunto de resultados)
          reclamosFinalizados: result[5][0].reclamosFinalizados,
          reclamosNoFinalizados: result[5][0].reclamosNoFinalizados,
  
          // Tiempo promedio de resolución en días para reclamos finalizados (séptimo conjunto de resultados)
          tiempoPromedioResolucionDias: result[6][0].tiempoPromedioResolucionDias,
        };
        return datosEstadisticas; // Devuelve el objeto con todos los datos de las estadísticas
      } catch (error) {
        console.error("Error al obtener estadísticas completas:", error);
        throw error; // Propaga el error para manejarlo en el controlador o servicio
      }
    },
  
    // Otras funciones de acceso a la base de datos...
  };
  
export default estadisticas;