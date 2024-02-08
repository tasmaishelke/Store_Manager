require('dotenv').config()
const connectDb = require('./database/connect')
const item = require('./models/storeModels')
const jsonProducts = require('./products.json')

const start = async () =>
{
    try {
        await connectDb(process.env.MONGO_URI)
        console.log("connected to database")
        await item.deleteMany()
        await item.create(jsonProducts)
        console.log("success")
        process.exit(0)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
