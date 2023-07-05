const sequelize = require('../utils/connection');
const user = require("../tests/createData/user")
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await user()
        console.log("Force success");
        process.exit();
    } catch(error){
        console.log(error);
    }
 }

main();