const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo de género
  sequelize.define('VG_user', {
    favorites: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    purchased: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    review: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    graphics: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: {
              args: [[0, 1, 2, 3, 4, 5]],
              msg: 'El valor debe ser 0, 1, 2, 3, 4 o 5',
            },
        },
        defaultValue:null
    },
    gameplay: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: {
              args: [[0, 1, 2, 3, 4, 5]],
              msg: 'El valor debe ser 0, 1, 2, 3, 4 o 5',
            },
        },
        defaultValue:null
    },
    quality_price: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: {
              args: [[0, 1, 2, 3, 4, 5]],
              msg: 'El valor debe ser 0, 1, 2, 3, 4 o 5',
            },
        },
        defaultValue:null
    },
}, {timestamps: true})
};
