import pool from "./config.js";

const ClienteDB = {
    // buscar usuario por email, nombre y apellido
    buscarUsuarioDB: async (correoElectronico, nombre, apellido) => {
        try{
            const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE correoElectronico = ? AND nombre = ? AND apellido = ?", [correoElectronico, nombre, apellido]);
            return usuarios;

        }catch(error){
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    },

    // Crear nuevo usuario y devolver su ID
    crearUsuarioDB: async (usuarioData) => {
        try{
            const [result] = await pool.query("INSERT INTO usuarios SET = ?", usuarioData);
            return result.insertId;

        }catch(error){
            throw new Error("Error al crear usuario: " + error.message);
        }
    },

    // Obtención de los detalles de un usuario por su ID
    obtenerUsuarioPorIdDB: async (idCliente) => {
        try{
            const [[usuario]] = await pool.query("SELECT idUsuario, idTipousuario FROM usuarios WHERE idUsuario = ?", [idCliente]);
            return usuario;

        }catch(error){
            throw new Error("Error al obtener usuario por su ID: " + error.message);
        }
    },

    // Actualizar datos de un usuario
    actualizarUsuarioDB: async (idUsuario, camposActualizar, valores) => {
        try{
            const query = `UPDATE usuarios SET ${camposActualizar.join(", ")} WHERE idUsuario = ? AND idTipoUsuario = 3`;
            await pool.query(query, [...valores, idUsuario]);

        }catch(error){
            throw new Error("Error al actualizar datos del usuario: " + erorr.message);
        }
    },

    registrarClienteDB: async (nombre, apellido, correoElectronico, contrasenia, imagen) => {
        try{
            const [result] = await pool.query(`INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nombre, apellido, correoElectronico, contrasenia, 3, imagen, 1]);
            return result.insertId;

        }catch(error){
            throw new Error("Error al registrar el cliente: " + error.message);
        }
    },

    verificarCorreoDB: async (correoElectronico) => {
        try{
            const [rows] = await pool.query("SELECT correoElectronico FROM usuarios WHERE correoElectronico = ?", [correoElectronico]);
            return rows.length > 0;
            
        }catch(error){
            throw new Error("Error al verificar el correo electrónico: " + error.message);
        }
    },
};


export default ClienteDB;