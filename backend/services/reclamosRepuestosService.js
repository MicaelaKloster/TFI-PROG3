import ReclamosRepuestosDB from "../database/reclamosRepuestosDB.js";

const ReclamosRepuestosService = {
	asociarRepuesto: async (idReclamo, idRepuesto) =>{
		try{
			const idAsociacion = await ReclamosRepuestosDB.asociarRepuesto(idReclamo, idRepuesto);
			
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
	
	obtenerRepuestoMasUtilizado: async () => {
		try{
			const repuesto = await ReclamosRepuestosDB.obtenerRepuestoMasUtilizadoDB();
			
			if (!repuesto) throw new Error("No hay repuestos utilizados en reclamos.");
			
			return repuesto;
		}catch(error){
			console.error("Error en ReclamosRepuestosService.obtenerRepuestoMasUtilizado:", error);
			
			throw new Error(error.message);
		}
	},
};

export default ReclamosRepuestosService;