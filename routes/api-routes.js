const db = require("../models");
let cart = []
module.exports = function(app){
    app.get("/api/products", function(req,res){
        db.Product.findAll({}).then(function (dbProduct){
            res.json(dbProduct)
        })
    })
    app.post("/api/products", function (req, res) {
        let idProduct = req.body.id
        let qty = req.body.qty
        db.Product.findOne({
            where: {
                id: idProduct
            }
        }).then(function(product){
            if( product.stock_quantity > qty){
                const { product_name, department_name, price, img_url } = product;
                const cartItem = {
                    product_name,
                    department_name,
                    price,
                    img_url,
                    qty
                }
                // product.qty = qty;
                cart.push(cartItem) 
                
                // Update Stock in 

                res.json({cart});

            }else{
                res.json({cart, msg: 'Insufficient Stock'});
            }
        });
    });
    app.get("/api/cart", function(req,res){
        res.json(cart)
    })
    app.delete("/api/cart", function(req, res) {
        cart = []
        res.json(cart);
    });
    app.put("/api/products", function(req, res) {
        console.log(req.body)
        db.Product.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
          .then(function(dbProduct) {
            res.json(dbProduct);
          });
    });

}



// let newStock = product.stock_quantity - qty;
// app.put("/api/products", function(req, res) {
//     console.log("New Stock:" + newStock)
//     db.Product.update({
//         stock_quantity: newStock,
//         where: {
//             id: idProduct
//         }
//       }).then(function(dbProducts) {
//             res.json(dbProducts);
//     });
// });