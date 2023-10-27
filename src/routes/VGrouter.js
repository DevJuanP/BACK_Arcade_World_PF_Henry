const { Router } = require("express") ;
const { getAllVGHandler, postVGHandler, getVGbyIdHandler, getVGbyNameHandler } = require("../handlers/VGHandler.js") ;

const VGrouter = Router()

VGrouter.get('/', getVGbyNameHandler)
VGrouter.post('/', postVGHandler)
VGrouter.get('/:id', getVGbyIdHandler)
//VGrouter.get('/name', getVGbyNameHandler)

module.exports =  VGrouter