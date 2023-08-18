const Users = require('./Users')
const products = require('./Products')

// EXPORT AL OBJJECTS
module.exports = {
    Users: new Users(),
    products:new products()
    
}