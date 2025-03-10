import ReclamosTipo from "../database/reclamosTipoDB.js";
import redisClient from "../index.js";

const ReclamosTipoService = {
    // Obtener todos los tipos de reclamos
    getAllReclamosTipo: async () => {
        try{
            const cacheKey = "reclamosTipo"; // Definir una clave para Redis
      
            // Verificar si los datos ya están en caché
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
              console.log("Datos obtenidos de la caché");
              return {
                status: 200,
                data: JSON.parse(cachedData),
              };
            }
      
            // Si no hay datos en caché, obtenerlos de la base de datos
            const rows = await ReclamosTipo.getAllReclamosTipoDB();
      
            // Si no se encuentran tipos de reclamos activos
            if (rows.length === 0) {
              return {
                status: 404,
                mensaje: "No se encontraron tipos de reclamos activos.",
              };
            }
      
            // Almacenar los resultados en Redis con una expiración de 1 hora (3600 segundos)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(rows));
      
            return {
              status: 200,
              data: rows,
            };

        }catch(error){
            console.error("Error al obtener tipos de reclamos:", error);
            throw new Error ("error al obtener reclamos Tipo: " + error.message);
        }
    },

    // Crear un nuevo tipo de reclamo
    crearReclamoTipo: async (descripcion) => {
        try{
            // Verificar si el reclamo ya existe
            const reclamosTipo = await ReclamosTipo.getReclamoTipoByDescripcionDB(descripcion);
            if(reclamosTipo != null){
                throw new Error("El tipo de reclamo ya existe");
            }

            // Crear tipo de reclamo en la base de datos
            const result = await ReclamosTipo.crearReclamoTipoDB(descripcion);
            return {
                status: 200,
                message: "Tipo de reclamo creado con éxito",
                id: result.insertId,
                descripcion,
            };

        }catch(error){
            console.error("Error al crear tipo de reclamo: ", error);
            throw new Error("Error al crear reclamo tipo: " + error.message);
        }
    },

    // Actualizar un tipo de reclamo
    actualizarReclamoTipo: async (idReclamoTipo, descripcion) => {
        try{
            // Verificar si el reclamo tipo existe en la base de datos
            const reclamoTipo = await ReclamosTipo.getReclamoTipoByIdDB(idReclamoTipo);
            if(!reclamoTipo){
                throw new Error("Reclamo tipo a actualizar no encontrado");
            }

            // Validar que haya una descripción para actualizar
            if(!descripcion){
                throw new Error("No se envió modificación alguna");
            }

            // Actualizar el tipo de reclamo
            await ReclamosTipo.actualizarReclamoTipoDB(idReclamoTipo, descripcion);

            // Retornar el resultado
            return {
                message: "Actualización de reclamo tipo con éxito",
                id: reclamoTipo.idReclamoTipo,
                descripcion,
            };

        }catch(error){
            throw new Error("Error al actualizar reclamo tipo: ", error.message);
        }
    },

    // Borrar (desactivar) un tipo de reclamo
    borrarReclamoTipo: async (idReclamoTipo) => {
        try{
            // Verificar si el reclamo tipo existe
            const reclamoTipo = await ReclamosTipo.getReclamoTipoByIdDB(idReclamoTipo);
            if(!reclamoTipo){
                throw new Error("Reclamo tipo no encontrado");
            }

            // Desactivar el reclamo tipo
            await ReclamosTipo.borrarReclamoTipoDB(idReclamoTipo);
            
        }catch(error){
            console.error("Error al borrar el reclamo tipo: ", error);
            throw new Error("Error al borrar reclamo tipo: " + error.message);
        }
    },

};

export default ReclamosTipoService;