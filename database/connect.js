const mongoose = require('mongoose');

const connectDB = (url) =>
{
    return mongoose.connect(url)
}

module.exports = connectDB

// // Set up mongoose connection
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// const dev_db_url =
//   "mongodb+srv://your_user_name:your_password@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority";
// const mongoDB = process.env.MONGODB_URI || dev_db_url;

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }
