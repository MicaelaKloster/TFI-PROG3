import redisClient from "../index.js";
import AdminDB from "../database/adminDB.js";
import bcrypt from "bcrypt";

const AdminService = {
    // Función para obtener usuarios segun idTipoUsuario
    getUsuariosByTipo: async (idTipoUsuario, cacheKey) => {
        try{
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData){
                console.log(`Datos de ${cachedKey} obtenidos de la caché`);
                return JSON.parse(cachedData);
            }

            const usuarios = await AdminDB.getAllUsuariosByTipoDB(idTipoUsuario);
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(usuarios)); // Guardar en redis
            return usuarios;
        }catch (error){
            console.error(`Error en AdminService.getUsuariosByTipo(${cacheKey}): `, error);
            throw error;
        }
    },

    // Funciones específicas que llaman a la genérica con el idTipoUsuario y cacheKey adecuados
    getAllEmpleados: function () {
        return this.getUsuariosByTipo(2, "empleados");
    },

    getAllClientes: function () {
        return this.getUsuariosByTipo(3, "clientes");
    },

    // Creación del usuario
    crearUsuario: async (usuarioData) => {
        const {
            nombre,
            apellido,
            correoElectronico,
            contrasenia,
            idTipoUsuario,
            imagen,
        } = usuarioData;

        try{
            // Verficar si el correo electrónico ya exsite
            const rows = await AdminDB.verificarCorreo(correoElectronico);

            // Llamar a la función de verificación
            if (rows.length > 0){
                throw new Error("El usuario ya está registrado.");
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(contrasenia, 10);
            const activo = 1; // Por defecto activo va a definirse en 1

            const user = {
                nombre,
                apellido,
                correoElectronico,
                contrasenia: hashedPassword,
                idTipoUsuario,
                imagen,
                activo, 
            };

            // Insertar el usuario en la base de datos
            const result = await AdminDB.crearUsuarioDB(user);

            return {
                message: "Usuario creado con éxito",
                id: result.insertId,
                nombre,
                correoElectronico,
                idTipoUsuario,
            };
        }catch (error){
            throw new Error(`${error.message}`);
        }
    },

    // Actualización de usuario
    actualizarUsuario: async (idUsuarioModificado, datosUsuario) => {
        try{
            // Obtener usuario a modificar de la base de datos
            const [usuarioModificado] = await AdminDB.obtenerUsuarioPorId(idUsuarioModificado);

            if (!usuarioModificado) return {error: "Usuario a modificar no encontrado", status: 404};

            const camposActualizar = [];
            const valoresActualizar = [];

            // Iterar sobre los datos de usuario
            for (const [key, value] of Object.entries(datosUsuario)){
                if (value !== undefined){
                    if (key === 'contrasenia'){
                        const hashedPassword = await bcrypt.hash(value, 10); // Encriptar contraseña
                        camposActualizar.push(`${key} = ?`);
                        valoresActualizar.push(hashedPassword);
                    }else{
                        camposActualizar.push(`${key} = ?`);
                        valoresActualizar.push(value);
                    }
                }
            }

            if (camposActualizar.length === 0){
                return {error: "No hay datos a modificar", status: 400};
            }

            // Actualizar en la base de datos
            await AdminDB.actualizarUsuarioDB(idUsuarioModificado, camposActualizar, valoresActualizar);

            // Determinar el tipo de usuario
            const tipoUsuario = usuarioModificado.idTipoUsuario === 3
                ? "cliente"
                : usuarioModificado.idTipoUsuario === 2
                ? "empleado"
                : "usuario";

            return {
                mensaje: `Se ha modificado un ${tipoUsuario} con éxito.`,
                id: idUsuarioModificado,
                ...datosUsuario, // Devuelve los datos modificados
            };
        }catch (error){
            console.error("Error en AdminService.actualizarUsuario: ", error);
            throw new Error(`${error.message}`);
        }
    },

    // Borrar (desactivar) usuario
    borrarUsuario: async (idUsuario) => {
        try{
            // Obtener el usuario de la base de datos
            const [usuario] = await AdminDB.obtenerUsuarioPorId(idUsuario);

            if(!usuario) {
                return {error: "Usuario a eliminar no encontrado", status: 404};
            }

            // Verificar si el usuario esta desactivado
            if(usuario.activo === 0){
                return {error: "El usuario ya estaba desactivado", status: 404};
            }

            // Desactivar (borrar logicamente) el usuario
            await AdminDB.borrarUsuarioDB(idUsuario);

            // Determinar el tipo de usuario
            let tipoUsuario;
            if(usuario.idTipoUsuario === 3){
                tipoUsuario = "cliente";
            }else if (usuario.idTipoUsuario === 2){
                tipoUsuario = "empleado";
            }else{
                tipoUsuario= "usuario";
            }

            return {message: `Se ha desactivado el ${tipoUsuario} correctamente.`};
        }catch (error){
            console.error("Error en AdminService.borrarUsuario: ", error);
            throw new Error(`${error.message}`);
        }
    },

    // Estadisticas
    obtenerUsuariosPorOficina: async () => {
        try{
            const datos = await AdminDB.obtenerUsuariosPorOficinaDB();

            if(!datos || datos.length === 0){
                throw new Error("No hay datos disponibles sobre usuarios por oficina.");
            }

            return{
                datosOficinas: datos.lenght,
                oficinas: datos,
            };
            
        }catch(error){
            console.error("Error en AdminService.obtenerUsuariosPorOficina: ", error);
            throw error;
        }
    },
};

export default AdminService;