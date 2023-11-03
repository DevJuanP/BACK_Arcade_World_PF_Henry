const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,  
        allowNull: false 
      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false 
      },
      lastname: {
        type: DataTypes.STRING, 
        allowNull: false 
      },
      nickname: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true
      },
      password: {
        type: DataTypes.STRING, 
        allowNull: false 
      },
      Email: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: {
          isEmail: true 
        }
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: false, 
        defaultValue: 'https://i.ibb.co/GsBDvzC/Imagen-de-un-usuario-no-logueado-con-luces-gamin-1.jpg' 
      }
    }, {
      timestamps: false 
    });
  };
  