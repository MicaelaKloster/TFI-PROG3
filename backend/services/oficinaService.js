import oficinas from "../database/oficinasDB.js";
import redisClient from "../index.js";

const oficinaService = {
    getAllOficinas: async () => {
        try{
            const cacheKey = "oficinas";
            const cachedData = await redisClient.get(cacheKey);

            if (cachedData){
                console.log("Datos obtenidos de la cache");
                return JSON.parse(cachedData);
            }

            const rows = await oficinas.getAllOficinasDB();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(rows));
            return rows;
        }catch(error){
            throw new Error("Error al obtener oficinas: ", error.message);
        }
    },

    getEmpleadosByOficina: async (idOficina) => {
        try{
            const cacheKey = `empleadosOficinas:${idOficina}`;
            const cachedData = await redisClient.get(cacheKey);
            
            if(cachedData) {
                console.log("Datos obtenidos de la cache");
                return JSON.parse(cachedData);
            }

            const rows = await oficinas.getEmpleadoByOficinaDB(idOficina);
            if(rows.length === 0){
                throw new Error("Oficina sin empleados asignados");
            }

            await redisClient.setEx(cachedKey, 3600, JSON.stringify(rows));
            return rows;

        }catch(error){
            throw new Error("Error al obtener empleados de oficina: " + error.message);
        }
    },

    asignarEmpleadoAOficina: async (idOficina, idUsuario) => {
        try{
            // Conversion de idOficina y idUsuario a números ya que vienen como string desde req.params
            const idUsuarioNum = Number(idUsuario);
            const idOficinaNum = Number(idOficina);

            if(isNan(idUsuarioNum)||isNan(idOficinaNum)){
                throw new Error("El ID de usuario o el ID oficina no son válidos.");
            }

            // Verificar si el empleado existe y cumple las condiciones
            const existeEmpleado = await oficinas.buscarEmpleadoDB(idUsuarioNum);

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
            const empleados = await oficinas.getEmpleadosByOficinaDB(idOficinaNum);

            // Verificar si el empleado se encuentra ya asignado a esa oficina
            const idEmpleadoNumero = idUsuarioNum;

            // Comparacion del id del empleado (usuario)
            const asignado = empleados.some(empleado => empleado.idUsuario === empleado.idEmpleadoNumero);
            if(asignado){
                throw new Error("El empleado ya se encuentra asignado a esa oficina");
            }

            //Agregar enmpleado a oficina
            const idAsignado = await oficinas.asignarEmpleadoDB(idOficinaNum, idUsuarioNum);

            return idAsignado;

        }catch(error){
            throw new Error("Error al asignar empleado a oficina: " + error.message);
        }
    },

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