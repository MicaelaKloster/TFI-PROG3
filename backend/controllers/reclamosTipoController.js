import ReclamosTipoService from "../services/reclamosTipoService.js";

const ReclamosTipoController = {
    getAllReclamosTipo: async (req, res) => {
        try{
            const result = await ReclamosTipoService.getAllReclamosTipo();

            if(result.status === 404){
                return res.status(404).json({mensaje: result.mensaje});
            }

            return res.status(200).json(result.data);

        }catch(error){
            console.error("Error en ReclamosController.getAllReclamosTipo: ", error);
            return res.status(500).json({error: "Error al obtener los tipos de reclamos."});
        }
    },

    crearReclamoTipo: async (req, res) => {
        const { descripcion } = req.body;

        if(!descripcion) {
            return res.status(404).json({error: "Falta ingresar la descripción del reclamo"});
        }

        try{
            const result = await ReclamosTipoService.crearReclamoTipo(descripcion);
            return res.status(200).json({
                message: result.message,
                id: result.id,
                descripcion: result.descripcion,
            });

        }catch(error){
            console.error("Error en ReclamosController.crearReclamoTipo: ", error);
            return res.status(500).json({error: error.message});
        }
    },

    actualizarReclamoTipo: async (req,res) => {
        const { idReclamoTipo } = req.params;
        const { descripcion } = req.body;

        try{
            const resultado = await ReclamosTipoService.actualizarReclamoTipo(idReclamoTipo, descripcion);
            res.status(200).json(resultado);

        }catch(error){
            console.error("Error en ReclamosController.actualizarReclamoTipo: ", error);
            return res.status(500).json({error: error.message});
        }
    },

    borrarReclamoTipo: async (req, res) => {
        const { idReclamoTipo } = req.params;
        try{
            await ReclamosTipoService.borrarReclamoTipo(idReclamoTipo);
            res.status(200).json({
                message: "Reclamo tipo desactivado con éxito",
                id: idReclamoTipo,
            });

        }catch(error){
            console.error("Error en ReclamosController.borrarReclamoTipo: ", error);
            return res.status(500).json({error: error.message});
        }
    },
};


export default ReclamosTipoController;