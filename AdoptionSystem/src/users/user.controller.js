'use strict'

import User from './user.model.js' //Unico que puede ir en mayúscula
import { encrypt, checkPassword } from '../utils/validator.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send('Hello world')
}

export const register = async (req, res) => {
    try {
        //Capturar la información del cliente (body)
        let data = req.body

        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        // asignar el rol por defecto 
        data.role = 'CLIENT' //si viene con otro valor o no viene, lo asigna con rol Cliente

        //Crear una instacia del modelo(schema)
        let user = new User(data)

        //Guardar la información 
        await user.save()

        //Respondo al usuario
        return res.send({ message: 'registered successfully' })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error registering user ', err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar la información (body)
        let { username, password } = req, body
        //Validar en el usuario existe
        let user = await User.findOne({ username })
        //Verifica que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responder (dar acceso)
            return res.send({ message: `Welcome ${user.name}` })
        }
        return res.status(404).send({message:'Invalid credentials'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async(req, res)=>{ //USUARIO LEGADO
    try {
        //OBTENER EL ID DEL USUARIO ACTUALIZAR
        let {id} = req.params
        //OBTENER DATOS QUE VAMOS A ACTUALIZAR
        let data = req.body
        //VALIDAR SI TRAE DATOS A ACTUALIZAR
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data tha cannot be udpate or missing'})
        //VALIDAR SI TIENE PERMISOS (TOKENIZACION) DIA LUNES
        //ACTUALIZAMOS EN LA DB
        let updateUser = await User.findOneAndUpdate(
            {_id:id}, //OBJECT <- HEXADECIMAL (HORA SYS, VERSION DE MONGO, LLAVE PRIVADA...)
            data,
            {new: true }//OBJETO DE LA DB YA ACTUZALIZADO
        )
        //VALIDAR SI SE ACTUALIZAO
        if(!updateUser) return res.status(401).send({message: 'User not found'})
        //RESPONDER CON EL DATO ACTUALIZADO
        return res.send({message: 'Update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.KeyValue.username)return res.status(400).send({message: `Username ${err.KeyValue.username} is ready taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try {
        //OBTENER EL ID
        let {id} = req.params
        //VALIDAR SI ESTA LOGEADO Y ES EL MISMO X HOY NO LO VEMOS X
        //ELIMINAR (deleteOne / findOneDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //VEREIFICAR QUE SE ELIMINO
        if(!deletedUser) return res.status(400).send({message: 'Accounr not found and not delete'})
        //RESPONDER
        return res.send({message: `Account with username ${deletedUser.username} deleted succesfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}