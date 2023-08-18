const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {verifyAToken} = require('../middleware/ErrorHandling')
const routes = express.Router()

// importing all models objects
const {Users}=require('../MODEL')

// login
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
module.exports ={
    express,
    routes
}

