const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purcharse = sequelize.define('purchase', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = Purcharse;