const path = require('path');
const express = require('express');
const { dirname } = require('path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({title: req.body.title});
    // return res.send('ok')
    return res.redirect('/');
})


// module.exports = router;
exports.routes = router;
exports.products = products;