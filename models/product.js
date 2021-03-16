const db = require('../util/database')
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        // this.quantity = quantity
        this.description = description
    }
    
    //function save
    save() {
        // products.push(this);
        return db.query(`INSERT INTO products (title, price, description, imageurl)
        VALUES ($1, $2, $3, $4)`, [this.title, this.price, this.description, this.imageUrl])
    }

    static deleteById() {
        
    }

    //static = can call on this class, not instantiated object
    static fetchAll() {
        return db.query('SELECT * FROM products')               
        // return products;
    }   

    static findById(id){
        return db.query(`SELECT * FROM products where products.id = $1`, [id])
    }
}