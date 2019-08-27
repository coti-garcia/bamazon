const db = require("../models");

module.exports = function(app){
    app.get("/api/products", function(req,res){
        db.Product.findAll({}).then(function (dbProduct){
            res.json(dbProduct)
        })
    })
    app.post("/api/products", function (req, res) {
        console.log(req.body)
        const product = req.body
        res.json(product);
    });
}