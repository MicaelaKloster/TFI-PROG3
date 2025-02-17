import bcrypt from 'bcrypt';
import ClienteDB from "../database/clienteDB.js";

const ClienteService = {
    // Registrar un nuevo cliente
    crearClienteDB: async (nombre, apellido, correoElectronico, contrasenia, imagen) => {
        // Verificar si el usuario ya existe
        const usuarios = await ClienteDB.buscarUsuarioDB(correoElectronico, nombre, apellido);
        if(usuarios.length > 0){
            throw new Error("Los datos de este usuario ya están cargados");
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const idTipoUsuario = 3; // Usuario tipo Cliente (3)
        const activo = 1; // Usuario activo por defecto

        // Crear el usuario en la base de datos
        const idUsuario = await ClienteDB.crearUsuario({
            nombre,
            apellido,
            correoElectronico,
            contrasenia: hashedPassword,
            idTipoUsuario,
            imagen,
            activo,
        });
    },

    // Actualización de Cliente
    actualizarCliente: async (idCliente, datosCliente) => {
        const camposActualizar = [];
        const valoresActualizar = [];

        // Iterar sobre las propiedades del body
        for(const [key, value] of Object.entries(datosCliente)){
            // Verificar si el valor esta definido antes de agregarlo a la lista de actualizaciones
            if(value !== undefined){
                if(key === 'contrasenia'){
                    const hashedPassword = await bcrypt.hash(value, 10);
                    camposActualizar.push(`${key}=?`);
                    valoresActualizar.push(hashedPassword);
                }else{
                    camposActualizar.push(`${key}=?`);
                    valoresActualizar.push(value);
                }
            }
        }

        if (camposActualizar.length === 0){
            throw new Error("No se recibieron campos para actualizar");
        }

        // Llamar a la base de datos para realizar la actualización de datos
        await ClienteDB.actualizarUsuarioDB(idCliente, camposActualizar, valoresActualizar);

        // Retornar datos actualizados
        return {
            id: idCliente,
            ...datosCliente
        };
    },
};

export default ClienteService;