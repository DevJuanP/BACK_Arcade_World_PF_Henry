const { DataTypes } = require("sequelize") 

module.exports = (sequelize) => {
    sequelize.define('Videogame', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
          },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
           ///cometario 
        },
        released: {
            type: DataTypes.DATEONLY,//yyyy-mm-dd
            allowNull: false
        }
        
    },  {timestamps: false})
} 