const db = require("../models");

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
                res.json(product);
            }else{
                res.send("The stock is not enough");
            }
        });
    });
}