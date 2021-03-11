const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop.controllers')


const router = express.Router();

// specific route first so not count dynamic
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.deleteCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

// router.get('/products', (req, res, next) => {

// });



module.exports = router;