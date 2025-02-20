import RepuestoDB from "../database/repuestoDB.js";

const RepuestoService = {
    // Obtener todos los repuestos
    getAllRepuestos: async () => {
        try{
            const repuestos = await RepuestoDB.getAllRepuestosDB();
            return repuestos;
        }catch(error){
            console.error("Error en RepuestoService.getAllRepuestos: ", error);
            throw new Error("No se pudieron obtener los repuestos");
        }
    },

    // Crear un nuevo repuesto
    crearRepuesto: async (nombre, observaciones, idDeposito) => {
        try{
            const result = await RepuestoDB.crearRepuestoDB(nombre, observaciones, idDeposito);
            return result;
        }catch(error){
            console.error("Error en RepuestoService.crearRepuesto: ", error);
            throw new Error("No se pudo crear repuesto");
        }
    },

    // Actualizar repuesto
    actualizarRepuesto: async (idRepuesto, nombre, observaciones, idDeposito) => {
        try{
            const actualizado = await RepuestoDB.actualizarRepuestoDB(idRepuesto, nombre, observaciones, idDeposito);
            if(!actualizado){
                throw new Error("Repuesto no encontrado o no modificado");
            }
            return "Repuesto actualizado correctamente";
        }catch(error){
            console.error("Error en RepuestoService.actualizarRepuesto: ", error);
        }
    },

    // Eliminar repuesto
    eliminarRepuesto: async (idRepuesto) => {
        try{
            const eliminado = await RepuestoDB.eliminarRepuestoDB(idRepuesto);
            if (!eliminado){
                throw new Error("Repuesto no encontrado o no se pudo eliminar");
            }
            return "Repuesto eliminado con éxito";
        }catch(error){
            console.error("Error en RepuestoService.eliminarRepuesto: ", error);
            throw new Error("No se pudo eliminar repuesto");
        }
    },
};

export default RepuestoService;