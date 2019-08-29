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
                const { id, product_name, department_name, price, img_url } = product;
                const cartItem = {
                    id,
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
        // console.log(req.body)
        console.log(cart);
        let allUpdates = [];
        cart.forEach(element =>{
            allUpdates.push(db.Product.findOne(
                {
                  where: {
                    id: element.id
                  }
                })
                .then(function(dbProduct) {
                  return dbProduct.update({
                      stock_quantity: dbProduct.stock_quantity - element.qty
                  });
                }));

            Promise.all(allUpdates).then(completed => {
                console.log('finished');
                cart = [];
            })
        })
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