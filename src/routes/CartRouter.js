const { Router } = require("express") ;
const {
    purchasedhandler,
    cartSuccessHandler
  } = require("../handlers/carthandler") ;

const CartRouter = Router()

CartRouter.post('/purchased', purchasedhandler)
CartRouter.post('/success', cartSuccessHandler)

module.exports =  CartRouter