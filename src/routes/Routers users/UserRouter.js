const { Router } = require("express") ;
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

UserRouter.get('/', getUsersHandler)
UserRouter.post('/register', userRegisterHandler)
UserRouter.post('/login', loginUserHandler)
UserRouter.put('/logout', VG_userHandler)
UserRouter.put('/update', updateUserHandler)
UserRouter.get('/firebase', firebaseHandler)
UserRouter.get('/:id', getuserById)

module.exports =  UserRouter