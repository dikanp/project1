const path = require('path');
const express = require('express');
// const { dirname } = require('path');
const adminController = require('../controllers/admin.controllers');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product', adminController.getEditProduct);



module.exports = router;
// exports.routes = router;