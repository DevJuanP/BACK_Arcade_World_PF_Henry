const { Router } = require("express") ;
const {
    getAllPurchases
  } = require("../handlers/purchaseHandler") ;

const PurchaseRouter = Router()

PurchaseRouter.get('/', getAllPurchases)

module.exports =  PurchaseRouter