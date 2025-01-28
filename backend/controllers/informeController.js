import InformeService from "../services/informeService.js";

const informeController = {
    informe: async (req, res) => {
        const formatosPermitidos = ['pdf', 'csv'];
        try{
            const formato = req.query.formato;
            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                })
            }
            
            // generar informe
            const {buffer, path, headers} = await InformeService.generarInforme(formato);

            // setear la cabecera de respuesta 
            res.set(headers)

            if (formato === 'pdf') {
                // respuesta al cliente  
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                // respuesta al cliente
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado:"Falla",
                            mensaje: " No se pudo generar el informe."    
                        })
                    }
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                mensaje: error.message || "Error interno en servidor."
            });
        } 
    },
}

export default informeController;