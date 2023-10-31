// Importa el módulo 'platform' desde el archivo '../db'.
const { platform } = require("../db");

// Define una función asincrónica para manejar la solicitud de obtener plataformas.
const getPlatformsHandler = async (req, res) => {
    try {
        // Obtiene todas las plataformas de la base de datos.
        const plataformas = await platform.findAll();
        
        // Mapea las plataformas para extraer solo sus nombres.
        const parsed = plataformas.map(p => p.name);
        
        // Responde con un código de estado 200 (Éxito) y los nombres de las plataformas en formato JSON.
        res.status(200).json(parsed);
    } catch (error) {
        // En caso de error, responde con un código de estado 400 (Solicitud incorrecta) y un objeto JSON que contiene el mensaje de error.
        res.status(400).json({ error: error.message });
    }
}

// Exporta la función 'getPlatformsHandler' para que pueda ser utilizada en otros módulos.
module.exports = getPlatformsHandler;