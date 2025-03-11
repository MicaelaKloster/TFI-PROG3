import pool from './config.js'; // Conexión a la base de datos

//Función para obtener el usuario por su correo electrónico
const getUserByEmail = async (correoElectronico) => {
    try{
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE correoElectronico = ?", [correoElectronico]);

        if(rows.length > 0){
            return rows[0]; // Retorna el primer usuario encontrado
        }
        return null; // Si no se encuentra el usuario devuelve null

    }catch(error){
        console.error("Error al obtener usuario por correo: ", error);
        throw error;
    }
};

// Función para obtener el usuario por su ID
const getUserById = async (idUsuario) => {
    try{
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE idUsuario = ?", [idUsuario]);

        if(rows.length > 0){
            return rows[0]; // Retorna el primer usuario encontrado
        }
        
        return null; // Si no se encuentra el usuario, devuelve null

    }catch (error){
        console.error("Error al obtener usuario por ID: ", error);
        throw error;
    }
};

export { getUserByEmail, getUserById };