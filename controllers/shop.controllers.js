const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //     res.render('shop/product-list', {
  //         prods: products,
  //         pageTitle: 'All Products',
  //         path: '/products'
  //     });
  // });
  // console.log('a')
  Product.fetchAll()
    .then(({ rows }) => {
      // console.log(rows)
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // console.log(products);
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId).then(({ rows }) => {
    // console.log(rows);
    res.render("shop/product-detail", {
      product: rows[0],
      pageTitle: rows[0].title,
      path: "products/" + prodId,
    });
  }).catch(err => console.log(err)
  // console.log(products);
  )};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(({rows}) => {
        // console.log(res.rows);
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
  // console.log(products);
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId)
  Product.findById(prodId, (product) => {
    // console.log(product)
    Cart.addProduct(prodId, product.price);
  });
  // console.log(prodId)
  res.redirect("/cart");
};

exports.deleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
