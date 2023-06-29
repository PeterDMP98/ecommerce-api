const sequelize = require('../utils/connection');
const user = require("../tests/createData/user")
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await user()
        console.log("Se ejecuto el Force");
        process.exit();
    } catch(error){
        console.log(error);
    }
 }

main();