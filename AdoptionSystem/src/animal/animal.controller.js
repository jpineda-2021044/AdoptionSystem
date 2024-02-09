'use strict'

import Animal from './animal.model.js'


export const registerAnimal = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let animal = new Animal(data)
        await animal.save()
        return res.send({ message: 'registered succesfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error registering animal' })
    }

}

export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateAnimal = await Animal.findOneAndUpdate({ _id: id },
            data,
            { new: true }
        )

        if (!updateAnimal) return res.status(401).send({ message: 'animal not found' })
        return res.send({ message: 'Update animal', updateAnimal })
    } catch (error) {
        console.error(error)
        return res.send({ message: 'Fail update animal', updateAnimal })
    }
}

