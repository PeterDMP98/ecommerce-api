const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = User;

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

/*Buena Practica encriptar la contraseña desde antes */
User.beforeCreate( async(user)=> {
    const hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword
})