const express = require('express')
const hostRouter = express.Router()
const {addHome} = require('../controller/hostcontroller.js')
const {postHome} = require('../controller/hostcontroller.js')
const {hosthomelist} = require('../controller/hostcontroller.js')
const {editHome} = require('../controller/hostcontroller.js')
const {postEditedHome} = require('../controller/hostcontroller.js')
const {deleteHome} = require('../controller/hostcontroller.js')


hostRouter.get('/host/create-home',addHome)
hostRouter.post('/host/post-home',postHome);
hostRouter.get('/host/home-list',hosthomelist )
hostRouter.get('/host/edit-home/:id',editHome)
hostRouter.post('/host/post-edited-home', postEditedHome)
hostRouter.post('/host/delete-home/:id',deleteHome)



module.exports = hostRouter
