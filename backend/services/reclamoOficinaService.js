import ReclamoOficinaDB from "../database/reclamoOficinaDB.js";
import NotificacionEmail from "./notificacionEmailService.js";
import ReclamoDB from "../database/reclamoDB.js";

const ReclamoOficinaService = {
    // Listar reclamos de la oficina asignada al empleado
    listarReclamosPorOficina: async (idEmpleado) => {
        try{
            const reclamos = await ReclamoOficinaDB.obtenerReclamosPorOficinaDB(idEmpleado);

            if(reclamos.length === 0) {
                throw new Error(`No se encontraron reclamos para la oficina asignada al empleado con ID ${idEmpleado}`);            
            }
            return reclamos;

        }catch(error){
            throw new Error("Error al listar los reclamos por oficina: " + error.message);
        }
    },

    // Actualizar el estado de un reclamo
    actualizarEstadoReclamo: async (idEmpleado, idCliente, nuevoEstado, idReclamo) => {
        try{
            const estadoNumerico = parseInt(nuevoEstado,10);
            const reclamo = await ReclamoDB.obtenerReclamoPorClienteYReclamoDB(idCliente,idReclamo);

            if(!reclamo){
                throw new Error("No se encontró el reclamo para este usuario.");
            }

            const estaAsignado = await ReclamoOficinaDB.verificarEmpleadoAsignado(idEmpleado, reclamo.idOficina);

            if(!estaAsignado){
                throw new Error("Este reclamo no le corresponde a su oficina");
            }

            const estadoValido = await ReclamoDB.obtenerEstadoReclamoPorId(estadoNumerico);

            if(!estadoValido) {
                throw new Error("El estado no es válido, debe ser un número entre el 1 y el 4.");
            }

            if(reclamo.idReclamoEstado === 3) {
                throw new Error("Reclamo ya cancelado.");
            }

            if(reclamo.idReclamoEstado === 4) {
                throw new Error("Reclamo ya finalizado.");
            }

            const resultado = await ReclamoOficinaDB.actualizarEstadoReclamo(idReclamo,idCliente,estadoNumerico,idEmpleado);

            if(resultado.affectedRows === 0){
                throw new Error("El estado no se pudo actualizar.");
            }

            // Se envía notificación vía correo electrónico de cambio de estado en el reclamo
            return await NotificacionEmail(reclamo, estadoValido.descripcion);

        }catch(error){
            throw new Error("Error al actualizar el estado del reclamo: " + error.message);
        }
    }
};

export default ReclamoOficinaService;