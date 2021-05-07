"use strict"
const sqlite3 = require('sqlite3').verbose()

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file)
        const user = `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            login TEXT UNIQUE,
            password TEXT,
            firstname TEXT,
            lastname TEXT,
            patronymic TEXT,
            email TEXT UNIQUE,
            phone INTEGER UNIQUE,
            birthdate TEXT,
            regdate TEXT,
            permission INTEGER
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
        const promo_code =  `CREATE TABLE IF NOT EXISTS promo_code (
            id INTEGER PRIMARY KEY,
            promo_code TEXT,
            discount TEXT,
            date_start TEXT,
            date_count TEXT
        )`
        const order = `CREATE TABLE IF NOT EXISTS order (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            discount TEXT,
            promo_code TEXT,
            payment_type INTEGER,
            delivery_type INTEGER,
            delivered INTEGER,
            summ TEXT,
            date TEXT,
            completed INTEGER,
            FOREIGN KEY (promo_code) REFERENCES promo_code (id),
            FOREIGN KEY (user_id) REFERENCES user (id)
        )`
        const product_order = `CREATE TABLE IF NOT EXISTS product_order (
            id INTEGER PRIMARY KEY,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY (order_id) REFERENCES order (id),
            FOREIGN KEY (product_id) REFERENCES product (id)
        )`
        this.createTable(user)
        // this.createTable(cat)
        // this.createTable(subcat)
        // this.createTable(product)
        // this.createTable(promo_code)
        // this.createTable(order)
        // this.createTable(product_order)
        
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