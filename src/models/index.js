const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");


Category.belongsTo(Product)
Product.hasMany(Category)

Cart.belongsTo(User)
User.hasOne(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)