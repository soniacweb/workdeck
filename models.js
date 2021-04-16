// const { toDefaultValue } = require('sequelize/types/lib/utils');
const { sequelize, DataTypes, Model } = require('./db');

const options = { sequelize, timestamps: false };


class Project extends Model {

}

Project.init({
    name: DataTypes.STRING,
    summary: DataTypes.STRING,
}, options);

class Task extends Model {

}


//   Task.init({
//     title: DataTypes.STRING,
//     description: DataTypes.STRING,
//     column: DataTypes.INTEGER,
//     defaultValue: 0,
//   }, options);

  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    column: DataTypes.INTEGER,
}, options);

class User extends Model {

}

User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
}, options);





Project.hasMany(Task)
User.hasMany(Task)
Task.belongsTo(Project)



module.exports = { Project, Task, User };