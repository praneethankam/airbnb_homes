const express = require('express')
const storeRouter = express.Router()
const controller = require('../controller/storecontroller.js')

storeRouter.get('/',controller.airbnb)
storeRouter.get('/store/bookings',controller.bookings)
storeRouter.get('/store/favlist',controller.favlist)
storeRouter.post('/store/favlist',controller.addtofavlist)
storeRouter.get('/store/homelist',controller.homelist)
storeRouter.get('/store/homelist/:homeid',controller.homedetail)
storeRouter.get('/rules/:filename', controller.houserules);
storeRouter.post('/store/remove-fav',controller.removefromfavlist)

module.exports = storeRouter