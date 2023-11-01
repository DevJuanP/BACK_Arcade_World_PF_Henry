const { Router } = require('express') 
const VGrouter = require('./Grouter Videogames/VGrouter') 
const UserRouter = require('./Routers users/UserRouter')
const getplatformshandler = require('../handlers/getplatformshandler.js')
const getGeresHandler = require('../handlers/getGeresHandler.js')


const router = Router()


router.use('/videogame', VGrouter)
router.use('/user', UserRouter)


router.use('/platform', getplatformshandler)
router.use('/genre',getGeresHandler)

module.exports = router