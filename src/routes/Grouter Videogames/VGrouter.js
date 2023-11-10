const { Router } = require("express") ;
const {
    getGamesHandler,
    getGamebyIdHandler,
    postGameHandler,
    updateGameHandler
} = require("../../handlers/VGHandler") ;

const VGrouter = Router()

VGrouter.get('/', getGamesHandler)
VGrouter.post('/', postGameHandler)
VGrouter.get('/:id', getGamebyIdHandler)
VGrouter.put('/update', updateGameHandler)

module.exports =  VGrouter