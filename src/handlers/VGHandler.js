const GetALLVideogames = require("../Controlers/GetAllVideogames");

// Controlador para obtener todos los videojuegos con información detallada
const getAllVGHandler = async (req, res) => {
    try {
        const Videojuegos = await GetALLVideogames();

        res.status(200).json(Videojuegos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getAllVGHandler;
