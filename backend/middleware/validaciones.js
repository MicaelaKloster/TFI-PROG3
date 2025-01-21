import Joi from 'joi';

const clienteSchema = Joi.object({
    nombre: Joi.string()
    .required()
    .messages({
        'any.required': 'El campo "nombre" es obligatorio.',
        'string.empty': 'El campo "nombre" no puede estar vacío.', 
    }),
    apellido: Joi.string()
    .required()
    .messages({
        'any.required': 'El campo "apellido" es obligatorio.',
        'string.empty': 'El campo "apellido" no puede estar vacío.',
    }),
    correoElectronico: Joi.string()
    .email()
    .required()
    .messages({
        'any.required': 'El campo "correo electrónico" es obligatorio.',
        'string.email': 'El campo "correo electrónico" debe ser un correo electrónico válido.',
        'string.empty': 'El campo "correo electrónico" no puede estar vacío.', 
    }),
    contrasenia: Joi.string()
    .min(6)
    .required()
    .messages({
        'any.required': 'El campo "contraseña" es obligatorio.',
        'string.empty': 'El campo "contraseña" no puede estar vacío.',
        'string.min': 'El campo "contraseña" debe tener al menos 6 caracteres.',
    }),
    imagen: Joi.string()
    .uri()
    .optional()
    .messages({
        'string.uri': 'El campo "imagen" debe ser una URL válida.',
    }),
});

export default clienteSchema;