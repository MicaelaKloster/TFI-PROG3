export default function contentTypeMiddleware (req, res, next) {
    // Si es un método GET o OPTIONS permitimos la solicitud
    if (req.method === 'GET' || req.method === 'OPTIONS'){
        return next();
    }

    //Aseguramos que req.body este definido y sea un objeto
    const hasBody = req.body && Object.keys(req.body).length > 0;

    // Si hay cuerpo y el Content-Type no es aplication/json ni aplication/pdf, retornamos error
    if (hasBody && req.headers['content-type'] !== 'application/json' && req.headers['content-type'] !== 'application/pdf'){
        return res.status(400).json({
            error: 'El Content-Type debe ser application/json o application/pdf'
        });
    }

    // Continuamos con el siguiente middleware
    next();
}