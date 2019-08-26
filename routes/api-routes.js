const db = require("../models");

module.exports = function(app){
    app.get("/api/products"), function(req,res){
        db.Product.findAll({}).then(function (dbProduct){
            res.json(dbProduct)
        })
    }
}