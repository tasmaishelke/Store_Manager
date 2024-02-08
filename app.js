require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./database/connect')
const storeRoutes = require('./routes/storeRoutes')
const defaultApiError = require('./middlewares/defaultApiError')
const port = process.env.PORT || 3000

// middleware functions
app.use('/api/v1/products', storeRoutes)
app.use(express.json())

// home route
app.get('/', (req, res) =>
{
    res.send('<h1> Store </h1> <a href = "/api/v1/products"> products </a>')
})
app.use(defaultApiError)

const start = async () =>
{
    try
    {
        await connectDB(process.env.MONGO_URI)
        console.log('Database is connected')
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch(error)
    {
        console.log(error)
    }
}
start()