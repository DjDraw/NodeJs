const Sequelize = require('sequelize');
const seq = require('./config.js').config;
const bcrypt = require('bcrypt-nodejs');

const User = seq.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
    }
});

User.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.validatePassword = function (newPassword, oldPassword){
    return bcrypt.compareSync(newPassword, oldPassword);
}

module.exports = {
    user: User
}