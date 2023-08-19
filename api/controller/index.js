const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {verifyAToken} = require('../middleware/ErrorHandling')
const routes = express.Router()

const {Users, Products}=require('../model')

routes.post('/login',
bodyParser.json(), (req, res)=>{
    Users.login(req, res)
})

// =====user router==========
routes.get('/Users',(req,res)=>{
    Users.fetchUsers(req,res)
})
routes.get('/User/:id',(req,res)=>{
    Users.fetchUser(req,res)
})
routes.post('/register', bodyParser.json(),
(req,res)=>{
    Users.register(req,res)
})
routes.put('/User/:id',bodyParser.json(),
(req,res)=>{
    Users.updateUser(req,res)
})
routes.patch('/User/:id',bodyParser.json(),
(req,res)=>{
    Users.updateUser(req,res)
})
routes.delete('/User/:id',(req,res)=>{
    Users.deleteUser(req,res)
})
// ===products==
routes.get('/Products',(req,res)=>{
  Products.fetchProducts(req,res)
})
routes.get('/Product/:id',(req,res)=>{
    Products.fetchProduct(req,res)
})
routes.post('/addProduct', bodyParser.json(),
(req,res)=>{
    Products.addProduct(req,res)
})
routes.put('/Product/:id',bodyParser.json(),
(req,res)=>{
    Products.updateProduct(req,res)
})
routes.patch('/Product/:id',bodyParser.json(),
(req,res)=>{
    Products.updateProduct(req,res)
})
routes.delete('/Product/:id',(req,res)=>{
    Products.deleteProduct(req,res)
})
module.exports ={
    express,
    routes
}

