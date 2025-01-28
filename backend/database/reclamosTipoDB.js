import pool from "./config.js";

const ReclamosTipoDB = {
    // Función para obtener todos los tipos de reclamos
    getAllReclamosTipoDB: async () => {
        try{
            const [rows] = await pool.query("SELECT * FROM reclamostipo WHERE activo = 1");
            return rows;

        }catch(error){
            console.error("Error al obtener los tipos de reclamos: ", error);
            throw error;
        }
    },

    // Obtener tipo de reclamo por ID
    getReclamoTipoByIdDB: async (idReclamoTipo) => {
        try{
            const [reclamoTipo] = await pool.query("SELECT * FROM reclamostipo WHERE idReclamoTipo = ?", [idReclamoTipo]);
            console.log(reclamoTipo);

            if(reclamoTipo.length > 0){
                return reclamoTipo[0];
            }
            return null;

        }catch(error){
            console.error("Error al obtener reclamo tipo por ID: ", error);
            throw error;
        }
    },

    // Obtener un tipo de reclamo por descripcion
    getReclamoTipoByDescripcionDB: async (descripcion) => {
        try{
            const [rows] = await pool.query("SELECT * FROM reclamosTipo WHERE descripcion = ?", [descripcion]);

            if(rows.length > 0){
                return rows[0];
            }
            return null;

        }catch(error){
            console.error("Error al obtener reclamo por descripción: ", error);
            throw error;   
        }
    },

    // Crear tipo de reclamo
    crearReclamoTipoDB: async (descripcion) => {
        try{
            const [rows] = await pool.query("INSERT INTO reclamosTipo SET activo = 1, descripcion = ?", [descripcion]);
            return rows.insertId;

        }catch(error){
            console.error("Error al crear tipo de reclamo: ", error);.
            throw error;
        }
    },

    // Actualizar tipo de reclamo
    actualizarReclamoTipoDB: async (idReclamoTipo, descripcion) => {
        try{
            await pool.query("UPDATE reclamosTipo SET descripcion = ? WHERE idReclamoTipo = ?", [descripcion, idReclamoTipo]);

        }catch(error){
            console.error("Error al actualizar tipo de reclamo: ", error);
            throw error;
        }
    },

    // Borrar tipo de reclamo
    borrarReclamoTipoDB: async (idReclamoTipo) => {
        try{
            await pool.query("UPDATE reclamosTipo SET activo = 0 WHERE idReclamoTipo = ?", [idReclamoTipo]);
            
        }catch(error){
            console.error("Error al borrar tipo de reclamo: ", error);
            throw error;
        }
    },
};

export default ReclamosTipoDB;