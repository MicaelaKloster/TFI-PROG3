import ReclamosRepuestosDB from "../database/reclamosRepuestosDB.js";

const ReclamosRepuestosService = {
	asociarRepuesto: async (idReclamo, idRepuesto) =>{
		try{
			const idAsociacion = await ReclamosRepuestosDB.asociarRepuestoDB(idReclamo, idRepuesto);
			
			return { message: "Repuesto asociado correctamente. ", idAsociacion };
		}catch(error){
			console.error("Error en ReclamosRepuestosService.asociarRepuesto: ", error);
			
			throw new Error(error.message);
		}
	},
	
	obtenerRepuestosPorReclamo: async (idReclamo) => {
		try{
			const repuestos = await ReclamosRepuestosDB.obtenerRepuestosPorReclamoDB(idReclamo);
			
			return repuestos;
		}catch(error){
			console.error("Error en ReclamosRepuestosService.obtenerRepuestosPorReclamo:", error);
			
			throw new Error(error.message);
		}
	},
	
	// obtenerRepuestoMasUtilizado: async () => {
		// try{
			// const repuesto = await ReclamosRepuestosDB.obtenerRepuestoMasUtilizadoDB();
			
			// if (!repuesto) throw new Error("No hay repuestos utilizados en reclamos.");
			
			// return repuesto;
		// }catch(error){
			// console.error("Error en ReclamosRepuestosService.obtenerRepuestoMasUtilizado:", error);
			
			// throw new Error(error.message);
		// }
	// },
	
	// Obtener el/los repuestos más utilizado/s
	obtenerRepuestoMasUtilizado: async () => {
		try {
		  const repuestos = await ReclamosRepuestosDB.obtenerRepuestoMasUtilizadoDB();
		  
		  if (!repuestos || repuestos.length === 0) {
			return { mensaje: "No hay datos suficientes para determinar el repuesto más utilizado." };
		  }

		  return { repuestosMasUtilizados: repuestos };
		}catch (error) {
		  console.error("Error en obtenerRepuestoMasUtilizado:", error);
		  throw error;
		}
	},
};


export default ReclamosRepuestosService;