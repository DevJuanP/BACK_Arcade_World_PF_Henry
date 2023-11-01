const { Router } = require("express") ;
const {
    getGamesHandler,
    getGamebyIdHandler,
    postGameHandler
} = require("../../handlers/VGHandler") ;

const VGrouter = Router()

VGrouter.get('/', getGamesHandler)
VGrouter.post('/', postGameHandler)
VGrouter.get('/:id', getGamebyIdHandler)
//VGrouter.get('/name', getVGbyNameHandler)

module.exports =  VGrouter