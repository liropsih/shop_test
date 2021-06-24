require('dotenv').config()
require('module-alias/register')
const sequelize = require('@@/database')
const createTable = require('./createTable')

const install = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await createTable()
        console.log('\x1b[32m', 'Установка завершена')
        process.exit()
    } catch (e) { console.log('\x1b[31m', e) }
}

install()