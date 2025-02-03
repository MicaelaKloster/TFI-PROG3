import { getUserByEmail } from '../database/authDB.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const ultimoTiempo = {}; // Para manejo de tiempo en los intentos de login

const loginService = async (correoElectronico, contrasenia) => {
    const tiempoActual = Date.now();
    const segundos = 60; // Tiempo minimo entre intentos de login
    const tokenExpiracion = '1h'; // Tiempo de expiracion del token
    
    if(ultimoTiempo[correoElectronico] && tiempoActual - ultimoTiempo[correoElectronico] < segundos * 1000){
        throw new Error("Has iniciado sesión recientemente. Intentalo de nuevo más tarde.");
    }

    // Llamar a la capa de base de datos para obtener el usuario por correo electrónico
    const usuario = await getUserByEmail(correoElectronico);
    if (!usuario) {
        throw new Error("Usuario no encontrado.");
    }

    // Verificar que el usuario este activo
    if (usuario.activo == 0){
        throw new Error("Usuario inactivo.");
    }

    // Verificar contraseña
    let contraseniaCorrecta = false;
    if (usuario.contrasenia.startsWith("$2b$") || usuario.contrasenia.startsWith("$2a$")){
        contraseniaCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);
    }else{
        contraseniaCorrecta = usuario.contrasenia === contrasenia;
    }

    if (!contraseniaCorrecta){
        throw new Error("Correo o contraseña incorrectos.");
    }

    // Crear el token JWT
    const payload = { idTipoUsuario: usuario.idTipoUsuario, idUsuario: usuario.idUsuario};

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: tokenExpiracion});

    // Guarda ek último tiempo de login
    ultimoTiempo[correoElectronico] = tiempoActual;

    return {
        success: true,
        status: 200,
        message: "Inicio de sesión exitoso",
        token,
        usuario: {
            idTipoUsuario: usuario.idTipoUsuario,
            idUsuario: usuario.idUsuario,
        }
    };
};

export { loginService };