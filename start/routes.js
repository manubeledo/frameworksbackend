'use strict'

const fs = require('fs')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const controllers = require('../controllers/index.js')

Route.on('/').render('template')

Route.get('/readall', controllers.readall)
Route.get('/read', controllers.read)           // to request by id => http://127.0.0.1:3333/read?id=3
Route.get('/create', controllers.create)       // add id too { "title": "titulo", "price": 100, "thumbnail": "thumb", "id": 1 }
Route.get('/deleted', controllers.deleted)     // delete by id
Route.get('/update', controllers.update)       // update by id

