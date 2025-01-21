import { loginService } from '../services/authService.js';

const login = async (req, res) => {
    const { correoElectronico, contrasenia } = req.body;

    try{
        const resultado = await loginService(correoElectronico, contrasenia);

        // Enviar la respuesta según el resultado del servicio
        return res.status(resultado.status).json({
            success: resultado.success,
            message: resultado.message,
            token: resultado.token || null,
            usuario: resultado.usuario || null
        });

    }catch (error){
        res.status(400).json({success: false, message: error.message});
    }
};

export { login };