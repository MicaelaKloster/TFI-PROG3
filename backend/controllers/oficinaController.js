import oficinaService from "../services/oficinaService.js";

const OficinaController = {
    getAllOficinas: async (req, res) => {
        try{
            const rows = await oficinaService.getAllOficinas();
            res.json(rows);
        }catch(error){
            console.error("Error al obtener las oficinas: ", error);
            res.status(500).json({error: "Error al obtener todas las oficinas"});
        }
    },

    getEmpleadosByOficina: async (req, res) => {
        const { idOficina } = req.params;
        try{
            const rows = await oficinaService.getEmpleadosByOficina(idOficina);
            res.json(rows);

        }catch(error){
            console.error("Error al obtener empleados de la oficina: ", error);
            res.status(500).json({error: error.message});
        }
    },

    asignarEmpleadoAOficina: async (req,res) => {
        const { idUsuario, idOficina } = req.params;
        try{
            const idAsignado = await oficinaService.asignarEmpleadoAOficina(idUsuario, idOficina);
            res.status(200).json({
                id: idAsignado,
                message: "Empleado asignado correctamente a la oficina",
            });

        }catch(error){
            console.error("Error al asignar empleado a oficina: ", error);
            res.status(500).json({error: error.message});
        }
    },

    eliminarEmpleadoDeOficina: async (req,res) => {
        const { idUsuario } = req.params;
        try{
            const result = await oficinaService.eliminarEmpleadoDeOficina(idUsuario);

            if(result.affectedRows === 0){
                return res.status(404).json({ message: "Usuario no encontrado en la oficina"});
            }

            res.json({message: "Usuario eliminado de la oficina correctmente"});

        }catch(error){
            console.error("Error al eliminar usuario de la oficina: ", error);
            res.status(500).json({error: error.message});
        }
    }
};


export default OficinaController;