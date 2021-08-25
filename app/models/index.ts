import * as fs from 'fs'
const path = require('path')
const { Sequelize, Model, DataTypes } = require('sequelize')
const basename = path.basename(module.filename)
import { sequelize } from '../config/sequelize'
let db = {}
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    console.log(file)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // NOTE: you have to change from the original property notation to
    // index notation or tsc will complain about undefined property.
    db[model['name']] = model
  })
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db['sequelize'] = sequelize
db['Sequelize'] = Sequelize

export default db
