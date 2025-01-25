import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio raiz del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir el directorio de subida
const uploadDir = path.join(__dirname, '../uploads'); // Carpeta ubicada fuera de la carpeta config

// Crear la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true});
}

// Configuramos Multer para almacenamiento
const storage = multer.diskStorage({destination: (req, file, cb) => {
        cb(null, uploadDir); // Define la ubicacion donde se guardarán las imagenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Exportar la configuracion de Multer
const upload = multer({ storage });
export default upload;