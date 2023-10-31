const { Router } = require('express') 
const VGrouter = require('./Grouter Videogames/VGrouter') 
const UserRouter = require('./Routers users/UserRouter')
const Favorites = require('./Favorite games/Favorites.js')
const getplatformshandler = require('../handlers/getplatformshandler.js')
const getGeresHandler = require('../handlers/getGeresHandler.js')


const router = Router()


router.use('/videogame', VGrouter)
router.use('/user', UserRouter)
//router.use('/favorites', Favorites)



router.use('/platform', getplatformshandler)
router.use('/genre',getGeresHandler)

module.exports = router