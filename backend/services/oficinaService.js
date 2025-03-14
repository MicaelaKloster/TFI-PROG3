import oficinas from "../database/oficinasDB.js";
import redisClient from "../index.js";

const oficinaService = {
    // Obtener todas las oficinas activas
    getAllOficinas: async () => {
        try{
            const cacheKey = "oficinas";
            const cachedData = await redisClient.get(cacheKey); // Aguardar a redis para obtener las oficinas de la cache

            if (cachedData){
                console.log("Datos obtenidos de la cache");
                return JSON.parse(cachedData);
            }

            const rows = await oficinas.getAllOficinasDB();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(rows)); // Si no están en la cache, las guarda
            return rows;
        }catch(error){
            throw new Error("Error al obtener oficinas: ", error.message);
        }
    },

    // Obtener empleados de una oficina
    getEmpleadosByOficina: async (idOficina) => {
        try{
            const cacheKey = `empleadosOficinas:${idOficina}`;
            const cachedData = await redisClient.get(cacheKey); // Se espera a Redis en caso de que esten en la cache
            
            if(cachedData) {
                console.log("Datos obtenidos de la cache");
                return JSON.parse(cachedData);
            }

            const rows = await oficinas.getEmpleadosByOficinaDB(idOficina);
            if(rows.length === 0){
                throw new Error("Oficina sin empleados asignados");
            }

            await redisClient.setEx(cacheKey, 3600, JSON.stringify(rows)); // Se guardan en cache
            return rows;

        }catch(error){
            throw new Error("Error al obtener empleados de oficina: " + error.message);
        }
    },

    // Asignar empleado a una oficina
    asignarEmpleadoAOficina: async (idOficina, idUsuario) => {
        try{
            // Verificar si el empleado existe y cumple las condiciones
            const existeEmpleado = await oficinas.buscarEmpleadoDB(idUsuario);

            if(existeEmpleado.length === 0){
                throw new Error("Empleado no encontrado");
            }

            if(existeEmpleado.activo !== 1){
                throw new Error("Empleado eliminado");
            }

            if(existeEmpleado.idTipoUsuario !== 2){
                throw new Error("El usuario no es de tipo empleado");
            }

            // Obtener los empleados ya asignados a la oficina
            const empleados = await oficinas.getEmpleadosByOficinaDB(idOficina);

            // Verificar si el empleado ya está asignado a la oficina
            const idUsuarioNumero = Number(idUsuario); // Lo convierto en numero ya que viene como string para realizar la comparación
            const yaAsignado = empleados.some(empleado => empleado.idUsuario === idUsuarioNumero);
            if (yaAsignado) {
                throw new Error("El empleado ya está asignado en la oficina");
            }

            // Agregar empleado a oficina
            const idAsignacion = await oficinas.asignarEmpleadoDB(idOficina, idUsuario);
            return idAsignacion;

        }catch(error){
            throw new Error("Error al asignar empleado a oficina: " + error.message);
        }
    },

    // Eliminación (desactivación) de un empleado de una oficina
    eliminarEmpleadoDeOficina: async (idUsuario) => {
        try{
            const result = await oficinas.eliminarEmpleadoDeOficinaDB(idUsuario);
            return result;

        }catch(error){
            throw new Error("Error al eliminar empleado de oficina: " + error.message);
        }
    },
};


export default oficinaService;