const { Router } = require("express") ;
const { verifyToken } = require("../../middleware/verifyToken");
const {
    getUsersHandler,
    userRegisterHandler,
    loginUserHandler,
    VG_userHandler,
    updateUserHandler,
    firebaseHandler,
    getuserById
  } = require("../../handlers/UserHandlers") ;

const UserRouter = Router()

UserRouter.get('/', verifyToken, getUsersHandler)
UserRouter.post('/register', userRegisterHandler)
UserRouter.post('/login', loginUserHandler)
UserRouter.put('/logout', VG_userHandler)
UserRouter.put('/update', updateUserHandler)
UserRouter.post('/firebase', firebaseHandler)
UserRouter.get('/:id', getuserById)

module.exports =  UserRouter