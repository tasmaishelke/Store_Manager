const storeSchema = require('../models/storeModels')


const getAllProductsStatic = async (req, res) =>
{   
    //const products = await storeSchema.find({})
    //const products = await storeSchema.find({}).sort('-name price') // by ascending,decending
    //const products = await storeSchema.find({}).select('name price') // select individual schema
    //const products = await storeSchema.find({}).limit('4') // shows only the 1st 'n' items
    const products = await storeSchema.find({}).skip('') // skips the 'n' items from start
    res.status(200).json({count : products.length, products})
}

const getAllProducts = async (req, res) =>
{
    const {featured, company, name, sort, fields, numericFilters} = req.query // sort is the name of sorting technique
    const queryObject = {}

    if(featured)
    {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company)
    {
        queryObject.company = company 
    }
    if(name)
    {
        queryObject.name = {$regex: name, $options: 'i'} // regex finds the character patterns
    }
    if(numericFilters) 
    {
        const operatorMap = 
        {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => 
        {
          const [field, operator, value] = item.split('-')
          if (options.includes(field))
          {
            queryObject[field] = {[operator]: Number(value)}
          }
        })
    }

    let result = storeSchema.find(queryObject)
    if(sort) // sorting
    {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else
    {
        result = result.sort('createdAt')
    }
    if(fields) // select
    {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) //|| 10
    const skip = (page - 1) * limit
    result = result.limit(limit).skip(skip)

    const products = await result
    res.status(200).json({count : products.length, products})

}

module.exports = 
{
    getAllProductsStatic,
    getAllProducts
}