const {genre} = require("../db")
const getGeresHandler = async (req, res) => {
    try {
        const generos = await genre.findAll()
        const parsedgenres = generos.map(g=>g.name)
        res.status(200).json(parsedgenres)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports = getGeresHandler