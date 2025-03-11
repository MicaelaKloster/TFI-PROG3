import VehiculosDB from "../database/vehiculoDB.js";

const VehiculosService = {
    // Obtener todos los vehículos
    getAllVehiculos: async () => {
        try {
            const vehiculos = await VehiculosDB.getAllVehiculosDB();
            return vehiculos;
        } catch (error) {
            console.error("Error en VehiculosService.getAllVehiculos:", error);
            throw new Error("No se pudieron obtener los vehículos");
        }
    },

    // Crear un nuevo vehículo
    crearVehiculo: async (marca, modelo, patente) => {
        try {
            const result = await VehiculosDB.crearVehiculoDB(marca, modelo, patente);
            return { message: "Vehículo creado con éxito", idVehiculo: result };
        } catch (error) {
            console.error("Error en VehiculosService.crearVehiculo:", error);
            throw new Error("No se pudo crear el vehículo");
        }
    },

    // Actualizar un vehículo
    actualizarVehiculo: async (idVehiculo, marca, modelo, patente) => {
        try {
            const actualizado = await VehiculosDB.actualizarVehiculoDB(idVehiculo, marca, modelo, patente);
            if (!actualizado) throw new Error("Vehículo no encontrado o no modificado");
            return { message: "Vehículo actualizado correctamente"};
        } catch (error) {
            console.error("Error en VehiculosService.actualizarVehiculo:", error);
            throw new Error("No se pudo actualizar el vehículo");
        }
    }
};


export default VehiculosService;