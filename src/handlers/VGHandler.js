const GetAllVideogames = require("../Controlers/VGControlers/GetAllVideogames");
const getVGbyName = require('../Controlers/VGControlers/getVGbyName')
const getGameById = require('../Controlers/VGControlers/getGameById')
const objectFilter = require('../utils/objectFilter')
const { Videogame } = require('../db')
const { validate } = require('uuid')

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
        if(!validate(id)) return res.json({error: "ya pero esto no es uuid (ﾉ*･ω･)ﾉ"})
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

const updateGameHandler = async (req, res) => {
    try {
        const dataToUpdate = await objectFilter(req.body)//se queda con lo necesario y hashea el password
        const {id} = dataToUpdate
        if(!id) return res.json({error: 'manda la id, sino como le hago?? ( ´･･)ﾉ(._.`)'});
        
        if(!validate(id)) return res.json({error: "ya pero esto no es uuid (ﾉ*･ω･)ﾉ"})
        const game = await Videogame.findByPk(id);

        if(!game) return res.json({error: 'juego no encontrado'})
        await Videogame.update(dataToUpdate, {
          where: {id}
        });

        res.status(200).json({ success: 'success'})
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports = {
    getGamesHandler,
    getGamebyIdHandler,
    postGameHandler,
    updateGameHandler
};
