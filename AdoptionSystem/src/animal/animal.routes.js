'use strict'

import  express  from 'express'


import {registerAnimal, updateAnimal } from './animal.controller.js'
const api = express.Router()

api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
export default api