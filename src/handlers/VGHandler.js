const GetAllVideogames = require("../Controlers/VGControlers/GetAllVideogames");
const getVGbyName = require('../Controlers/VGControlers/getVGbyName')
const getGameById = require('../Controlers/VGControlers/getGameById')

// Controlador para obtener todos los videojuegos con información detallada

const getGamesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name){
            const AllGames = await GetAllVideogames();
            return  res.status(200).json(AllGames)
        }

        const games = await getVGbyName(name)
        res.status(200).json(games)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getGamebyIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        //validaciones:

        ///
        const gameById = await getGameById(id)
        res.status(200).json(gameById)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postGameHandler = async (req, res) => {
    const {} = req.body
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getGamesHandler,
    getGamebyIdHandler,
    postGameHandler
};
