import pool from "./config.js";

const ReclamosRepuestosDB = {
	// Asociar un repuesto a un reclamo
	asociarRepuestoDB: async (idReclamo, idRepuesto) => {
		try{
			const query = "INSERT INTO reclamosRepuestos (idReclamo, idRepuesto) VALUES (?,?)";
			const result = await pool.query(query, [idReclamo,idRepuesto]);
			return result.insertId;
		}catch(error){
			console.error("Error al asociar repuesto al reclamo: ", error);
			throw new Error("No se pudo asociar repuesto al reclamo");
		}
	},
	
	// Obtener repuestos asociados a un reclamo
	obtenerRepuestosPorReclamoDB: async (idReclamo) => {
		try{
			const query = `SELECT r.idRepuesto, r.nombre, r.observaciones, r.idDeposito FROM reclamosRepuestos rr
						JOIN repuestos r on rr.idRepuesto = r.idRepuesto
						WHERE rr.idReclamo = ?`;
		
			const [result] = await pool.query(query, [idReclamo]);
			return result;
		}catch(error){
			console.error("Error al obtener repuestos de un reclamo: ", error);
			throw new Error("No se pudieron obtener los repuestos del reclamo.");
		}
	},
	
	// Obtener el repuesto más utilizado
	// obtenerRepuestoMasUtilizadoDB: async () => {
		// try{
			// const query = `SELECT r.idRepuesto, r.nombre, COUNT(rr.idRepuesto) AS cantidadUso
							// FROM reclamosRepuestos rr
							// JOIN repuestos r ON rr.idRepuesto=r.idRepuesto
							// GROUP BY r.idRepuesto, r.nombre
							// ORDER BY cantidadUso DESC 
							// LIMIT 1`;
							
			// const [[result]] = await pool.query(query);

			// return result || null;
		// }catch(error){
			// console.error("Errror al obtener el repuesto más utilizado: ", error);
			// throw new Error("No se pudo obtener el repuesto más utilizado.");
		// }
	// },
	
	// Obtener el/los repuestos más utilizado/s
	obtenerRepuestoMasUtilizadoDB: async () => {
		try {
		  const consulta = `
			SELECT rr.idRepuesto, r.nombre, COUNT(rr.idRepuesto) AS cantidadUsos
			FROM reclamosRepuestos rr
			JOIN repuestos r ON rr.idRepuesto = r.idRepuesto
			GROUP BY rr.idRepuesto, r.nombre
			HAVING cantidadUsos = (
			  SELECT MAX(cantidadUsos)
			  FROM (
				SELECT COUNT(idRepuesto) AS cantidadUsos FROM reclamosRepuestos GROUP BY idRepuesto
			  ) AS subconsulta
			);
		  `;

		  const [resultado] = await pool.query(consulta);
		  return resultado;
		} catch (error) {
		  console.error("Error al obtener el repuesto más utilizado:", error);
		  throw error;
		}
	},
};


export default ReclamosRepuestosDB;