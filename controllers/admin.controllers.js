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
    const products = new Product(null, title, imageUrl, description, price);
    products.save().then( () => {
        res.redirect('/')
    }).catch(err => console.log(err));
    // return res.send('ok')
    // return res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
    // console.log(req.body)
    const {id, title, imageUrl, description, price} = req.body
    // products.push({title: req.body.title});
    const products = new Product(id, title, imageUrl, description, price);
    products.save();
    // return res.send('ok')
    return res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    // const editMode = req.query.edit
    // console.log(editMode)
    // if(!editMode) return res.redirect('/')
    const prodId = req.params.productId
    Product.findById(prodId).then( product => {
        if (!product) return res.redirect('/')
        res.render('admin/edit-product', {
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            // editing: editMode,
            product: product
        });

    }).catch() 
    // Product.findById()
    // res.sendFile(path.join(__dir  name, '..', 'views', 'add-product.html'));
};

exports.getProducts = async (req, res, next) => {
    // Product.fetchAll().then(products => {
    //     console.log(products)
    // }).catch()
    try{
        const {rows} = await Product.fetchAll();
        res.render('admin/products', {
            prods: rows,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
        console.log(product)
    }
    catch(error) {
        console.log(error)
    }
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}