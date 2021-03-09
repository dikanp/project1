const path = require('path')
const fs = require('fs')

const p = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
        
    }

    static addProduct(id, productPrice) {
        console.log(productPrice);
        fs.readFile(p, (err, fileContent) => {
            console.log(err)
            console.log(fileContent.toString())
            // return
            let cart = {products : [], totalPrice: 0}
            if (!err && fileContent!=''){
                cart = JSON.parse(fileContent);
            }
            // return
            const existingProductIndex = cart.products.findIndex(prod => {
                return prod.id === id
            })
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                // cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products.push(updatedProduct)
                // cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice){
         fs.readFile(p, (err, fileContent) => {
            console.log('buka file cart')
            if (err) return
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart }
            const product = updatedCart.products.find(
                product => product.id == id
            )
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id != id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
                console.log('data cart terhapus')
            })
         })
    }
}