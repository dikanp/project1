const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin')

router.get('/', (req, res, next) => {
    // console.log(path.dirname(require.main.path));
    console.log(adminData.products)
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    // console.log('First Page')
    // return res.send('<a href="/admin/add-product">ADD PRODUCT</a>')
})

router.get('/shop', (req, res, next) => {

});

module.exports = router;