const { Router } = require("express") ;
const {
    getUsersHandler,
    userRegisterHandler,
    loginUserHandler,
    VG_userHandler,
    updateUserHandler
  } = require("../../handlers/UserHandlers") ;

const UserRouter = Router()

UserRouter.get('/', getUsersHandler)
UserRouter.post('/register', userRegisterHandler)
UserRouter.post('/login', loginUserHandler)
UserRouter.put('/logout', VG_userHandler)
UserRouter.put('/update', updateUserHandler)

module.exports =  UserRouter