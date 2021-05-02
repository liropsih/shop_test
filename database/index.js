"use strict"
const sqlite3 = require('sqlite3').verbose()

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file)
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                password text,
                permission integer)`
        return this.db.run(sql);
    }

    findOne(data, sel, tab, callback) {
        return this.db.get(
            `SELECT * FROM ${tab} WHERE ${sel} = ?`,
            data, (err, row) => {
                callback(err, row || null)
            })
    }

    insertUser(userdata, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,password) VALUES (?,?,?)',
            userdata, (err) => {
                callback(err)
            })
    }


    // async findOne(data, sel, callback) {
    //     return await this.db.get(
    //         `SELECT * FROM user WHERE ${sel} = ?`,
    //         data, async (err, row) => {
    //             await callback(err, row || null)
    //         })
    // }

    // selectById(id, callback) {
    //     return this.db.get(
    //         `SELECT * FROM user WHERE id = ?`,
    //         [id], function (err, row) {
    //             callback(err, row)
    //         })
    // }

    // async selectByEmail(email, callback) {
    //     return await this.db.get(
    //         `SELECT * FROM user WHERE email = ?`,
    //         email, async (err, row) => {
    //             await callback(err, row)
    //         })
    // }

    // selectAll(callback) {
    //     return this.db.all(`SELECT * FROM user`, function (err, rows) {
    //         callback(err, rows)
    //     })
    // }
}

module.exports = Db