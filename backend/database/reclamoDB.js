import pool from "./config.js";

const ReclamoDB = {
    obtenerReclamoDB: async () => {
        try{
            const [reclamos] = await pool.query("SELECT * FROM reclamos");
            return reclamos;

        }catch(error){
            console.error("Error al obtener todos los reclamos de la base de datos", error);
            throw error;
        }
    },

    // Verificación para saber si existe un reclamo para un usuario con el mismo asunto
    buscarReclamoPorUsuarioYAsuntoDB: async (idUsuarioCreador, asunto) => {
        try{
            const [result] = await pool.query("SELECT idReclamo FROM reclamos WHERE idUsuarioCreador = ? AND asunto = ?", [idUsuarioCreador, asunto]);

            // Si el resultado tiene al menos un reclamo significa que ya existe
            if (result.legth > 0){
                return result[0]; // Retorna el primer reclamo encontrado
            }

            return null; //No existe un reclamo con esos parametros

        }catch(error){
            throw new Error("Error al buscar el reclamo por usuario y asunto " + error.message);
        }
    },
    
    // Crear nuevo reclamo y devolver su ID
    crearReclamoDB: async (reclamoData) => {
        try{
            const [result] = await pool.query("INSERT INTO reclamos SET ?", [reclamoData]);
            return result.insertId;

        }catch(error){
            throw new Error("Error al crear el reclamo: " + error.message);
        }
    },

    // Función para obtener un reclamo por id del Cliente y el id del Reclamo
    obtenerReclamoPorClienteYReclamoDB: async (idCliente, idReclamo) => {
        try{
            const [[reclamo]] = await pool.query(`
            SELECT r.asunto, r.idReclamo, r.idReclamoEstado, r.idReclamoTipo, u.correoElectronico, u.nombre, o.idOficina
            FROM reclamos r
            JOIN usuarios u ON r.idUsuarioCreador = u.idUsuario
            JOIN reclamosTipo rt ON r.idReclamoTipo = rt.idReclamoTipo
            JOIN oficinas o ON rt.idReclamoTipo = o.idReclamoTipo
            WHERE r.idReclamo = ? AND r.idUsuarioCreador = ?`, [idReclamo, idCliente]);
    
            return reclamo;

        }catch(error){
            throw new Error("Error al obtener el reclamo: " + error.message);
        }
    },

    // Cancelar reclamo asignando al reclamo el asunto cancelado
    cancelarReclamoDB: async (idCliente, idReclamo) => {
        try{
            await pool.query("UPDATE reclamos SET fechaCancelado = NOW(), idReclamoEstado = 3 WHERE idUsuarioCreador = ? AND idReclamo = ?", [idCliente, idReclamo]);
            
        }catch(error){
            throw new Error("Error al cancelar reclamo: " + error.message);
        }
    },

    // Obtener todos los reclamos hechos por un usuario en especifico
    obtenerReclamoPorUsuarioDB: async (idUsuario) => {
        try{
            const [rows] = await pool.query(`SELECT r.idReclamo, r.asunto, r.idReclamoEstado, re.descripcion FROM reclamos r JOIN reclamosestado re ON r.idReclamoEstado = re.idReclamoEstado WHERE idUsuarioCreador = ?`, [idUsuario]);
            return rows;

        }catch(error){
            throw new Error("Error al obtener todos los reclamos del usuario: " + error.message);
        }
    },

    // Obtención del estado de reclamo por idEstado
    obtenerEstadoReclamoPorId: async (idEstado) => {
        try{
            const [[estado]] = await pool.query(`SELECT descripcion FROM reclamosestado WHERE idReclamoEstado = ?`, [idEstado]);
            return estado;

        }catch(error){
            throw new Error("Error al obtener el estado del reclamo: " + error.message);
        }
    },

    // Obtener reclamos paginados
    obtenerReclamosPaginadosDB: async (offset, limit) => {
        try{
            const [reclamos] = await pool.query(`SELECT * FROM reclamos ORDER BY fechaCreado DESC LIMIT ? OFFSET ?`, [limit, offset]);

            const [[{total}]] = await pool.query(`SELECT COUNT(*) AS total FROM reclamos`);

            return { reclamos, total };

        }catch(error){
            console.error("Error al obtener reclamos con paginación: ", error);
            throw error;
        }
    },
	
	// Vehiculos
	obtenerVehiculosPorTipoReclamoDB: async () => {
		try {
			const [rows] = await pool.query(`
				SELECT rt.descripcion AS tipoReclamo, v.marca, v.modelo, v.patente
				FROM reclamos r
				JOIN vehiculos v ON r.idVehiculo = v.idVehiculo
				JOIN reclamostipo rt ON r.idReclamoTipo = rt.idReclamoTipo
				GROUP BY rt.descripcion, v.marca, v.modelo, v.patente
				ORDER BY rt.descripcion;
			`);
			return rows;
		} catch (error) {
			console.error("Error al obtener vehículos por tipo de reclamo:", error);
			throw error;
		}
	},
};


export default ReclamoDB;