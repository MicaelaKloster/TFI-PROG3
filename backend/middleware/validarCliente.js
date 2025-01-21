import clienteSchema from './validaciones.js';

const validarCliente = (req,res,next) => {
    const { error } = clienteSchema.validate(req.body);

    // Si hay un error de validacion, devuelve un error 400 con detalles
    if (error){
        return res.status(400).json({
            estado: "Falla",
            mensaje: error.details.map(err => err.message) // Muestra los mensajes de error
        });
    }

    next();
}


export default validarCliente;