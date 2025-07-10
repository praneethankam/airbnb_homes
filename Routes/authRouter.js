const express = require('express')
const authRouter = express.Router()
const { getlogin } = require('../controller/authcontroller.js')
const { postlogin } = require('../controller/authcontroller.js')
const { postlogout } = require('../controller/authcontroller.js')
const { getsignup } = require('../controller/authcontroller.js')
const { postsignup } = require('../controller/authcontroller.js')

authRouter.get('/login', getlogin)
authRouter.post('/login',postlogin)
authRouter.post('/logout',postlogout)
authRouter.get('/signup',getsignup)
authRouter.post('/signup',postsignup)


module.exports = authRouter