import pool from "./config.js";

const RepuestoDB = {
    //CRUD
    // Obtener todos los repuestos
    getAllRepuestosDB: async () => {
        try{
            const [rows] = await pool.query("SELECT * FROM repuestos");
            return rows;
        }catch(error){
            console.error("Error en RepuestoDB.getAllRepuestosDB: ", error);
            throw new Error("Error al obtener todos los repuestos");
        }
    },


    // Crear un nuevo repuesto
    crearRepuestoDB: async (nombre, observaciones, idDeposito) => {
        try{
            const [result] = await pool.query("INSERT INTO repuestos (nombre, observaciones, idDeposito) VALUES (?,?,?)", [nombre, observaciones, idDeposito]);
            return result.insertId;
        }catch(error){
            console.error("Error en RepuestoDB.crearRepuestoDB: ", error);
            throw new Error("Error al crear el repuesto");
        }
    },

    // Actualizar un repuesto
    actualizarRepuestoDB: async (idRepuesto, nombre, observaciones, idDeposito) => {
        try{
            const [result] = await pool.query("UPDATE repuestos SET nombre = ?, observaciones = ?, idDeposito = ? WHERE idRepuesto = ?", [nombre, observaciones, idDeposito, idRepuesto]);
			return result.affectedRows > 0;
        }catch(error){
            console.error("Error en RepuestoDB.actualizarRepuestoDB: ", error);
            throw new Error("Error al actualizar el repuesto");
        }
    },

    // Eliminar un repuesto
    eliminarRepuestoDB: async (idRepuesto) => {
        try{
            const [result] = await pool.query("DELETE FROM repuestos WHERE idRepuesto = ?", [idRepuesto]);
			return result.affectedRows > 0;
        }catch(error){
            console.error("Error en RepuestoDB.eliminarRepuestoDB: ", error);
            throw new Error("Error al eliminar repuesto");
        }
    },
};

export default RepuestoDB;