const { Op } = require('sequelize');
const { User, VG_user, Videogame, genre, platform } = require('../db');

const isNumeric = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

const getAllUsers = async (req, res) => {
  try {
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const VG_userHandler = async (req, res) => {
  const { UserId, favorites, reviews, purchased, graphics, gameplay, quality_price } = req.body;
  try {
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  VG_userHandler,
};

