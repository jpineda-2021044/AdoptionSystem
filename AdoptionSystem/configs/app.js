// TODA LA CONFIGURACION DE EXPRESS

// IMPORTACIONES
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/users/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'

// CONFIGURACIONES
const app = express() //CREAR EL SERVIDOR
config()
const port = process.env.PORT || 3200

//CONFIGURAR EL SERVIDOR DE EXPRESS
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //ACEPTAR LAS SOLICITUDES DE DIFERENETES ORIGENES (LOCAL, REMOTO) /POLITICAS DE ACCESO
app.use(helmet()) //APLICA CAPA DE SEGURIDAD
app.use(morgan('dev')) //CREA LOGS DE SOLICITUDES AL SERVIDOR HTTP

//DECLARACION DE RUTAS
app.use(userRoutes)
app.use(animalRoutes)

// LEVANTAR EL SERVIDOR
export const initServer = ()=>{
    app.listen(port)
    console.log(`SERVER HTTP RUNNING IN PORT ${port}`)
}
