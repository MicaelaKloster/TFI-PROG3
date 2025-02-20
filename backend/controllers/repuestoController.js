import RepuestoService from "../services/repuestoService.js";

const RepuestoController = {
    getAllRepuestos: async (req, res) =>{
        try{
            const repuestos = await RepuestoService.getAllRepuestos();
            res.status(200).json(repuestos);
        }catch(error){
            res.status(500).json({error: error.mesagge});
        }
    },

    crearRepuesto: async (req, res) =>{
        try{
            const {nombre, observaciones, idDeposito} = req.body;
            const repuesto = await RepuestoService.crearRepuesto(nombre, observaciones, idDeposito);
            res.status(201).json({message: "Repuesto creado con éxito", repuesto});
        }catch(error){
            res.status(400).json({error: error.message});
        }
    },

    actualizarRepuesto: async (req, res) => {
        try{
            const {idRepuesto} = req.params;
            const {nombre, observaciones, idDeposito} = req.body;

            const result = await RepuestoService.actualizarRepuesto(idRepuesto, nombre, observaciones, idDeposito);

            res.status(200).json({message: result});
        }catch(error){
            res.status(400).json({error: error.message});
        }
    },

    borrarRepuesto: async (req, res) => {
        try{
            const {idRepuesto} = req.params;
            const result = await RepuestoService.eliminarRepuesto(idRepuesto);

            res.status(200).json({message: result});
        }catch(error){
            res.status(400).json({error: error.message});
        }
    },
};

export default RepuestoController;