const userController = require('./userController');

const getAllUserHandler = userController.getAllUsers;
const postUserHandler = userController.registerUser;
const loginUserHandler = userController.loginUser;
const VG_userHandler = userController.VG_userHandler;

module.exports = {
  getAllUserHandler,
  postUserHandler,
  loginUserHandler,
  VG_userHandler,
};