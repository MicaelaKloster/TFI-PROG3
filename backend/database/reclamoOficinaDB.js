import pool from "./config.js";

const ReclamoOficinaDB = {
    // Función para obtener los reclamos de la oficina del empleado
    obtenerReclamosPorOficinaDB: async (idEmpleado) => {
        try{
            const [reclamos] = await pool.query(`SELECT o.nombre, r.asunto, r.descripcion, r.fechaCreado FROM usuariosOficinas uo JOIN oficinas o ON o.idReclamoTipo = rt.idReclamoTipo JOIN reclamos r on rt.idReclamosTipo = r.idReclamoTipo WHERE uo.idUsuario = ?`, [idEmpleado]);
            return reclamos;

        }catch(error){
            throw new Error("Error al obtener los reclamos de la oficina: " + error.message);
        }
    },

    // Función para verificar si el empleado está asignado a la oficina
    verificarEmpleadoAsignado: async (idEmpleado, idOficina) => {
        try{
            const [[empleadoAsignado]] = await pool.query(`SELECT 1 FROM usuariosOficinas WHERE idUsuario = ? AND idOficina = ?`, [idEmpleado, idOficina]);
            return !!empleadoAsignado; // Devuelve true si existe, false si no

        }catch(error){
            throw new Error("Error al asignar empleado a oficina: " + error.message);
        }
    },

    // Función para actualizar el estado del reclamo
    actualizarEstadoReclamo: async (idReclamo, idCliente, estadoNumerico, idEmpleado) => {
        try{
            let query = 'UPDATE reclamos SET idReclamoEstado = ?';
            const valores = [estadoNumerico];

            if(estadoNumerico === 3){
                query+= ', fechaCancelado = NOW()';
            }else if(estadoNumerico === 4){
                query += ', fechaFinalizado = NOW() idUsuarioFinalizador = ?';
                valores.push(idEmpleado); // Agrega idEmpleado solo si esl estado es finalizado (4)
            }

            query+= ' WHERE idReclamo = ? AND idUsuarioCreador = ?';
            valores.push(idReclamo, idCliente);

            const [resultado] = await pool.query(query, valores);
            return resultado;

        }catch(error){
            throw new Error("Error al actualizar el estado del reclamo: " + error.message);
        }
    }
};

export default ReclamoOficinaDB;