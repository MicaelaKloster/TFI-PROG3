import VehiculosService from "../services/vehiculoService.js";

const VehiculosController = {
    getAllVehiculos: async (req, res) => {
        try {
            const vehiculos = await VehiculosService.getAllVehiculos();
            res.status(200).json(vehiculos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    crearVehiculo: async (req, res) => {
        try {
            const { marca, modelo, patente } = req.body;
            const vehiculo = await VehiculosService.crearVehiculo(marca, modelo, patente);
            res.status(201).json(vehiculo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    actualizarVehiculo: async (req, res) => {
        try {
            const { idVehiculo } = req.params;
            const { marca, modelo, patente } = req.body;
            const result = await VehiculosService.actualizarVehiculo(idVehiculo, marca, modelo, patente);
            res.status(200).json({ message: result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};


export default VehiculosController;