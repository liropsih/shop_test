"use strict"
const sqlite3 = require('sqlite3').verbose()

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file)
        const user = `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            permission integer
        )`
        // const user = `CREATE TABLE IF NOT EXISTS user (
        //     id	BLOB NOT NULL DEFAULT (randomblob(8)) UNIQUE,
        //     name TEXT,
        //     email TEXT UNIQUE,
        //     password TEXT,
        //     permission INTEGER
        // )`
        const cats = `CREATE TABLE IF NOT EXISTS cats (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE
        )`
        const subcats = `CREATE TABLE IF NOT EXISTS subcats (
            id INTEGER PRIMARY KEY,
            catname TEXT,
            name TEXT UNIQUE,
            FOREIGN KEY (catname) REFERENCES cats (name)
        )`
        this.createTable(user)
        this.createTable(cats)
        this.createTable(subcats)
    }

    createTable(sql) {
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