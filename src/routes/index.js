const { Router } = require('express') 
const VGrouter = require('./Grouter Videogames/VGrouter') 
const UserRouter = require('./Routers users/UserRouter')
const getplatformshandler = require('../handlers/getplatformshandler.js')
const getGeresHandler = require('../handlers/getGeresHandler.js')
const purchasedhandler = require('../handlers/purchasedhandler')


const router = Router()


router.use('/videogame', VGrouter)
router.use('/user', UserRouter)


router.use('/cart/purchase', purchasedhandler)
router.use('/platform', getplatformshandler)
router.use('/genre',getGeresHandler)

module.exports = router

/*
    ruta para compras_
    post: '/purchase'
    body: {
        purchases:[
            gameIds...
        ]
    }
    //pasarela de pago:
    redirección:
    exito: http//localhost:5473/summary
    fail: http//localhost:5473/failed
*/