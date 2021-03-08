// const products = []
const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = cb => {    
    fs.readFile(p, (err, fileContent) => {
        if (err || fileContent == '')  return cb([]);
        return cb(JSON.parse(fileContent));
    })
}

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
        getProductsFromFile(products => {
            console.log(this.id)
            if (this.id){
                const existingProductIndex = products.findIndex(
                    prod => prod.id == this.id
                )
                const updatedProduct = [...products]
                console.log(updatedProduct)
                updatedProduct[existingProductIndex] = this
                console.log(updatedProduct)
                // return 0
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        })
    }

    //static = can call on this class, not instantiated object
    static fetchAll(cb) {
        getProductsFromFile(cb);        
        // return products;
    }

    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => {
                // console.log(p.id)
                // console.log(product)
                return p.id === id
            });
            // console.log(product)
            cb(product);
        })
    }
}