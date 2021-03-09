// const products = []
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(__dirname, '..', 'data', 'products.json');
const c = path.join(__dirname, '..', 'data', 'cart.json');

const getProductsFromFile = cb => {    
    fs.readFile(p, (err, fileContent) => {
        if (err || fileContent == '')  return cb([]);
        return cb(JSON.parse(fileContent));
    })
}

const getProductsFromCartFile = cb => {    
    fs.readFile(c, (err, fileContent) => {
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

                //updated product
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

                //updated cart
                const price = products[existingProductIndex].price
                console.log(price)
                getProductsFromCartFile(cart => {
                    const existingCartIndex = cart.products.findIndex(
                        product => {
                            // console.log(product.id.length)
                            // console.log(this.id.length)
                            return product.id == this.id
                        }
                    )
                    // console.log(existingCartIndex)
                    if (existingCartIndex !== -1) {
                        const updatedCart = {...cart}
                        const qty = cart.products[existingCartIndex].qty
                        console.log(qty)
                        console.log('price'+price)
                        if (price != this.price) {
                            console.log(this.price)
                            updatedCart.totalPrice = updatedCart.totalPrice - (price*qty) + (+this.price*qty)
                            console.log(updatedCart.totalPrice)
                            fs.writeFile(c, JSON.stringify(updatedCart), (err) => {
                                console.log(err);
                            })
                        }
                        
                    }
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

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id == id)
            const updatedProduct = products.filter(prod=> prod.id != id)
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                if (!err) {
                    console.log('data produk terhapus')
                    Cart.deleteProduct(id, product.price);
                }
            })
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