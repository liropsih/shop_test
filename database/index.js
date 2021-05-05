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
        const cat = `CREATE TABLE IF NOT EXISTS cat (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE
        )`
        const subcat = `CREATE TABLE IF NOT EXISTS subcat (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            cat_id INTEGER,
            FOREIGN KEY (cat_id) REFERENCES cat (id)
        )`
        const product = `CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            quantity INTEGER,
            price INTEGER,
            price_old INTEGER,
            image TEXT,
            subcat_id INTEGER,
            FOREIGN KEY (subcat_id) REFERENCES subcat (id)
        )`
        const order = `CREATE TABLE IF NOT EXISTS order (
            id INTEGER PRIMARY KEY,
            product_id INTEGER,
            user_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY (product_id) REFERENCES product (id),
            FOREIGN KEY (user_id) REFERENCES user (id)
        )`
        this.createTable(user)
        // this.createTable(cat)
        // this.createTable(subcat)
        // this.createTable(product)
        // this.createTable(order)
        
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

        // const user = `CREATE TABLE IF NOT EXISTS user (
        //     id	BLOB NOT NULL DEFAULT (randomblob(8)) UNIQUE,
        //     name TEXT,
        //     email TEXT UNIQUE,
        //     password TEXT,
        //     permission INTEGER
        // )`

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