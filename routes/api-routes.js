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
                product.qty = qty;
                cart.push(product) 
                
                // Update Stock in DB
                let newStock = product.stock_quantity - qty;
                app.put("/api/products", function(req, res) {
                    console.log("New Stock:" + newStock)
                    db.Product.update({
                        stock_quantity: newStock,
                        where: {
                            id: idProduct
                        }
                      }).then(function(dbProducts) {
                            res.json(dbProducts);
                    });
                });

                res.json(cart);

            }else{
                res.send("The stock is not enough");
            }
        });
    });

}