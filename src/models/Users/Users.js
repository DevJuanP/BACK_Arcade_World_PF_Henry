const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // Definimos el modelo de usuario (User) y le inyectamos la conexión a Sequelize.
  
    sequelize.define('User', {
      id: {
        type: DataTypes.UUID, // Tipo de dato UUID
        defaultValue: DataTypes.UUIDV4, // Valor predeterminado generado automáticamente
        primaryKey: true,  
        allowNull: false 
      },
      name: {
        type: DataTypes.STRING, // Tipo de dato STRING para el nombre
        allowNull: false 
      },
      lastname: {
        type: DataTypes.STRING, // Tipo de dato STRING para el apellido
        allowNull: false 
      },
      nickname: {
        type: DataTypes.STRING, // Tipo de dato STRING para el apodo/nickname
        allowNull: false, 
        unique: true
      },
      password: {
        type: DataTypes.STRING, // Tipo de dato STRING para la contraseña
        allowNull: false 
      },
      Email: {
        type: DataTypes.STRING, // Tipo de dato STRING para la dirección de correo electrónico
        allowNull: false, 
        unique: true, 
        validate: {
          isEmail: true // Valida que sea una dirección de correo electrónico válida
        }
      },
      image: {
        type: DataTypes.STRING, // Tipo de dato STRING para la URL de la imagen de perfil
        allowNull: false, 
        defaultValue: 'https://i.ibb.co/GsBDvzC/Imagen-de-un-usuario-no-logueado-con-luces-gamin-1.jpg' // Valor predeterminado si no se proporciona
      }
    }, {
      timestamps: false 
    });
  };
  