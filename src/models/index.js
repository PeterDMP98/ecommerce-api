const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purcharse = require("./Purchase");
const User = require("./User");

/* product n-1 categoria */
Product.belongsTo(Category)
Category.hasMany(Product)

/*cars 1-1/ users*/
Cart.belongsTo(User)
User.hasOne(Cart)

/*Cart n-1 products*/
Cart.belongsTo(Product)
Product.hasMany(Cart)

/*purchese 1-n user */
Purcharse.belongsTo(User)
User.hasMany(Purcharse)

/*purchase 1-n product*/
Purcharse.belongsTo(Product)
Product.hasMany(Purcharse)

/*productImg 1-N */
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)