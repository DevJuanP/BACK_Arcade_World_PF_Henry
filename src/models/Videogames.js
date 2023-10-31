const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo de videojuego (Videogame)
// e inyectamos la conexión a Sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo de videojuego
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true, 
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato STRING para el nombre del videojuego
      allowNull: false, 
      unique: true 
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    image: {
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    price: {
      type: DataTypes.FLOAT, // Tipo de dato FLOAT para el precio del videojuego
      allowNull: false 
    },
    released: {
      type: DataTypes.DATEONLY, // Tipo de dato DATEONLY para la fecha de lanzamiento (yyyy-mm-dd)
      allowNull: false 
    }
  }, {
    timestamps: false 
  });
};
