const {Sequelize, DataTypes, Model} = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite') //best practise for file paths
    
});

 module.exports={sequelize, DataTypes, Model};