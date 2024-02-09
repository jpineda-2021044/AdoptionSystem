'use strict'
//RUTAS DEL USUARIO

import express from 'express'
import { test, register, login, update } from './user.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', update)

export default api

// export const api //TENGO QUE UTILIZAR SI O SI EL NOMBRE QUE ESTA EN EL ARCHIVO 
// export default api //TENGO QUE IMPORTAR CON OTRO NOMBRE EJ: userROUTES