const mongoose =  require('mongoose');
require('dotenv').config()

const connectDatabase = () => {
    mongoose.connect(process.env.DB, {
        dbName: 'supply',
    })
    .then(()=>console.log("db connection success."))
    .catch((error) => console.log(error));
}

module.exports = {
   connectDatabase: connectDatabase()
}