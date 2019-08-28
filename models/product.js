module.exports = function (sequelize, DataType){
    const Product = sequelize.define("Product", {
        product_name: DataType.STRING,
        department_name: DataType.STRING,
        price: DataType.INTEGER,
        stock_quantity: DataType.INTEGER,
        img_url: DataType.STRING
    });

    return Product;
}