const Category = require("./Category");
const Product = require("./Product");

Category.belongsTo(Product)
Product.hasMany(Category)