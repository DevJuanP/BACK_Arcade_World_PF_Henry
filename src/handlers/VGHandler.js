const { Videogame, genre, platform } = require('../db') 
const {Op} = require('sequelize')

const getAllVGHandler = async (req, res) => {
    try {

        const games = await Videogame.findAll({
            include:[
                {model: genre},
                {model: platform}
            ]}
        )

        const gamesParsed = games.map( vg => {
            return{
                id: vg.id,
                name: vg.name,
                description: vg.description,
                image: vg.image,
                price: vg.price,
                released: vg.released,
                genres: vg.genres.map( g => g.name),
                platforms: vg.platforms.map( p => p.name)
            }
        })
        
        res.status(200).json(gamesParsed)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVGbyIdHandler = async (req, res) => {
    const {id} = req.params
    try {
        const gamebyId = await Videogame.findByPk(id, {
            include:[
                {
                    model: genre,
                    attributes: ['name']
                },
                {
                    model: platform,
                    attributes: ['name']
                }
            ]
        })
        const gamesParsed = {
            id: gamebyId.id,
            name: gamebyId.name,
            description: gamebyId.description,
            image: gamebyId.image,
            price: gamebyId.price,
            released: gamebyId.released,
            genres: gamebyId.genres.map( g => g.name),
            platforms: gamebyId.platforms.map( p => p.name)
        }
        res.status(200).json(gamesParsed)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVGbyNameHandler = async (req, res) => {
    const {name} = req.query
    if(!name) return getAllVGHandler(req, res)
    try {
        const tofind = name.split(' ') //"war gragon" → ["war", "dragon"], ["portal"]
        let gameDB = await Videogame.findAll({
            where: {
                [Op.or]: tofind.map(str => {
                    return{
                        name: {
                            [Op.iLike]: `%${str}%` 
                        }
                    }
                })
            }
        })
        res.status(200).json(gameDB)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postVGHandler = async (req, res) => {
    try {
        console.log('body',req.body);
        ///const {name} = req.body
        await Videogame.create({
            ...req.body
        })
        res.status(200).json({
            succses: 'The video game was successfully uploaded to the database'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postVGHandler,
    getAllVGHandler,
    getVGbyIdHandler,
    getVGbyNameHandler
}