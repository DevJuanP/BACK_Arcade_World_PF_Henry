// Importa el módulo "genre" desde el archivo "../db"
const { genre } = require("../db");

// Controlador para manejar la solicitud de obtención de géneros de videojuegos
const getGenresHandler = async (req, res) => {
  try {
    // Consulta la base de datos para obtener todos los géneros
    const generos = await genre.findAll();

    // Mapea los resultados para obtener solo los nombres de los géneros
    const parsedGenres = generos.map((g) => g.name);

    // Responde con un código de estado 200 y los géneros en formato JSON
    res.status(200).json(parsedGenres);
  } catch (error) {
    // En caso de un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Exporta el controlador para su uso en otros módulos
module.exports = getGenresHandler;