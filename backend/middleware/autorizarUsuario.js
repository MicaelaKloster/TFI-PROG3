// Función que evalua el perfil de usuario a autorizar

export default function autorizarUsuarios (perfilAutorizados = []){
    return (req, res, next) => {
        const usuario = req.user;
        if (!usuario || !perfilAutorizados.includes(usuario.idTipoUsuario)){
            return res.status(403).json({
                estado: "falla",
                mensaje: "Acceso denegado."
            })
        }
        next(); // continua
    }
}