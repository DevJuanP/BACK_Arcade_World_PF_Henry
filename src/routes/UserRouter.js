const { Router } = require("express") ;
const { getAllUserHandler, postUserHandler, loginUserHandler, VG_userHandler } = require("../handlers/UserHandlers.js") ;

const UserRouter = Router()

UserRouter.get('/', getAllUserHandler)
UserRouter.post('/register', postUserHandler)
UserRouter.post('/login', loginUserHandler)
UserRouter.post('/logout', VG_userHandler)

module.exports =  UserRouter