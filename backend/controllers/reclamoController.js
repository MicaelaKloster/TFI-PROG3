import ReclamoService from "../services/reclamoService.js";


const ReclamoController = {
    // Obtener todos los reclamos
    getAllReclamos: async (req, res) => {
        try{
            const rows = await ReclamoService.getAllReclamos();
            res.json(rows);
        }catch(error){
            console.error("Error al obtener los reclamos:", error);
            res.status(500).json({ error: "Error al obtener los reclamos" });
        }
    },

    // Crear un nuevo reclamo
    crearReclamo: async (req, res) => {
        const { asunto, descripcion, idReclamoTipo } = req.body;
        const {idUsuario} = req.user;
        try {
            const nuevoReclamo = await ReclamoService.crearReclamo(
                asunto,
                descripcion,
                idUsuario,
                idReclamoTipo
            );

            res.status(200).json({
                message: "Reclamo creado con éxito",
                ...nuevoReclamo,
            });

        }catch(error){
            res.status(400).json({ error: error.message });
        }
    },

    // Cancelar un reclamo
    cancelarReclamo: async (req, res) => {
        const {idUsuario} = req.user;
        const {idReclamo } = req.params;
        try {
            const reclamoModificado = await ReclamoService.cancelarReclamo(idUsuario, idReclamo);
            if (reclamoModificado.estado){
                res.status(200).send({estado:"OK", mensaje: reclamoModificado});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoModificado.mensaje});
            }

        }catch(error){
            console.error("Error al cancelar reclamo:", error);
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener estado de un reclamo
    obtenerReclamoEstado: async (req, res) => {
        const { idUsuario } = req.user;
        try{
            const {reclamos,message} = await ReclamoService.obtenerReclamoEstado(idUsuario);
            res.status(200).json({ message, idCliente: idUsuario, reclamos });
        }catch(error){
            console.error("Error al obtener el estado del reclamo:", error);
            return res.status(404).json({ error: "No se encontraron reclamos para este cliente." });
        }
    },

    // Obtener reclamos paginados
	
    // getReclamosPaginados: async (req, res) => {
        // // Recibe parametros de paginación
        // const { page = 1, pageSize = 10 } = req.query;

        // try{
            // const result = await ReclamoService.getReclamosPaginados(Number(page), Number(pageSize));
            // res.status(200).json(result);
            
        // }catch(error){
            // console.error("Error en ReclamoController.getReclamosPaginados: ", error);
            // res.status(500).json({ error: "Error al obtener los reclamos."});
        // }
    // },
	
	getReclamosPaginados: async (req, res) => {
		const { page, pageSize } = req.query;

		// Validar que page y pageSize existan y sean números
		if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
		  return res.status(400).json({ error: "Los parámetros 'page' y 'pageSize' son requeridos y deben ser números." });
		}

		try {
		  const resultado = await ReclamoService.getReclamosPaginados(Number(page), Number(pageSize));
		  res.status(200).json(resultado);
		} catch (error) {
		  console.error("Error al obtener reclamos paginados:", error);
		  res.status(500).json({ error: "Error al obtener los reclamos." });
		}
	},
	
	// Vehiculos
	obtenerVehiculosPorTipoReclamo: async (req, res) => {
		try {
			const resultado = await ReclamoService.obtenerVehiculosPorTipoReclamo();
			res.status(200).json(resultado);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener los vehículos por tipo de reclamo" });
		}
	},
};

export default ReclamoController;