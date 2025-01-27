import dotenv from "dotenv";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 

dotenv.config(); // Para cargar las variables de entorno

const notificacionEmail = async (reclamo, estadoReclamo) => {
  // Cargar plantilla de correo electrónico
  const filename = fileURLToPath(import.meta.url);
  const dir = path.dirname(filename);
  const backendDir = path.resolve(dir, "..");
  const plantilla = fs.readFileSync(
    path.join(backendDir + "/utiles/handlebars/plantilla.hbs"),
    "utf-8"
  );
  const template = handlebars.compile(plantilla);

  // Crear datos para la plantilla
  const datos = {
    cliente: reclamo.nombre,
    estadoReclamo: estadoReclamo,
    asunto: reclamo.asunto,
  };


  const correoHtml = template(datos);

  // Configurar y enviar correo electrónico
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CORREO,
      pass: process.env.CLAVE,
    },
  });

  const mailOptions = {
    to: reclamo.correoElectronico,
    subject: "NOTIFICACION RECLAMO",
    html: correoHtml,
    text: "Este es un mensaje de notificación",
    headers: {
      "X-Priority": "3",
      "X-MSMail-Priority": "Normal",
      Importance: "Normal",
    },
  };

  try{
    // Enviar correo
    const info = await transporter.sendMail(mailOptions);
    return { 
      estado: true,
      mensaje: `El estado del reclamo ha sido actualizado a ${estadoReclamo}.`,
      notificacion: "Notificación enviada correctamente.",
    };
  }
  catch(error){
    return { estado: false, mensaje: 'Correo electrónico no enviado.' };
  }

};

export default notificacionEmail;
