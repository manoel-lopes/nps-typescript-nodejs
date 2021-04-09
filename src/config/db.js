const ini = require('ini')
const fs = require('fs')

const {
  host,
  username,
  password,
  database } = ini.parse(fs.readFileSync('./env.ini', 'utf-8'))

module.exports = {
  dialect: 'postgres',
  host,
  username,
  password,
  database,
  define: {
    timestamps: true,
    underscored: true
  },
};