import pool from "./config.js";

const VehiculosDB = {
    // Obtener todos los vehículos
    getAllVehiculosDB: async () => {
        try {
            const [rows] = await pool.query("SELECT * FROM vehiculos");
            return rows;
        } catch (error) {
            console.error("Error al obtener vehículos:", error);
            throw error;
        }
    },

    // Crear un nuevo vehículo
    crearVehiculoDB: async (marca, modelo, patente) => {
        try {
            const [result] = await pool.query(
                "INSERT INTO vehiculos (marca, modelo, patente) VALUES (?, ?, ?)", 
                [marca, modelo, patente]
            );
            return result.insertId;
        } catch (error) {
            console.error("Error al crear vehículo:", error);
            throw error;
        }
    },

    // Actualizar un vehículo
    actualizarVehiculoDB: async (idVehiculo, marca, modelo, patente) => {
        try {
            const [result] = await pool.query(
                "UPDATE vehiculos SET marca = ?, modelo = ?, patente = ? WHERE idVehiculo = ?", 
                [marca, modelo, patente, idVehiculo]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al actualizar vehículo:", error);
            throw error;
        }
    }
};

export default VehiculosDB;