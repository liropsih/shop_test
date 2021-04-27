"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                password text,
                is_admin integer)`
        return this.db.run(sql);
    }

    selectById(id, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE id = ?`,
            [id], function (err, row) {
                callback(err, row)
            })
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], function (err, row) {
                callback(err, row)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function (err, rows) {
            callback(err, rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,password) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db