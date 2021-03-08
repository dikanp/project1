const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.render('admin/add-product', {
        pageTitle:'Add Product',
        path:'/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body)
    const {title, imageUrl, description, price} = req.body
    // products.push({title: req.body.title});
    const products = new Product(title, imageUrl, description, price);
    products.save();
    // return res.send('ok')
    return res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        pageTitle:'Edit Product',
        path:'/admin/edit-product'
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })
}