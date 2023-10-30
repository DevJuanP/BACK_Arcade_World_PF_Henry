const { Videogame, genre, platform, User } = require('../db') 
const {Op} = require('sequelize')

const isNumeric = (value) => {
    return typeof value === "number" && !isNaN(value);
  };

const getAllVGHandler = async (req, res) => {
    try {

        const games = await Videogame.findAll({
            include:[
                { model: genre },
                { model: platform },
                { model: User }
            ]}
        )

        const gamesParsed = games.map( vg => {

            const reviews = vg.Users.filter( user => user.VG_user.review !== '').map( user => { return{
                id: user.id,
                nickName: user.nickname,
                created: user.VG_user.createdAt.toISOString().slice(0, 10),
                lastUpdate: user.VG_user.updatedAt.toISOString().slice(0, 10),
                review: user.VG_user.review
            }})

            const graphics = vg.Users.filter( user => isNumeric(user.VG_user.graphics)).map( user => user.VG_user.graphics)

            const gameplay = vg.Users.filter( user => isNumeric(user.VG_user.gameplay)).map( user => user.VG_user.gameplay)

            const quality_price = vg.Users.filter( user => isNumeric(user.VG_user.quality_price)).map( user => user.VG_user.quality_price)

            return{
                id: vg.id,
                name: vg.name,
                description: vg.description,
                image: vg.image,
                price: vg.price,
                released: vg.released,
                genres: vg.genres.map( g => g.name),
                platforms: vg.platforms.map( p => p.name),
                reviews,
                graphics,
                gameplay,
                quality_price
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
                },
                { model: User }
            ]
        })

        const reviews = gamebyId.Users.filter( user => user.VG_user.review !== '').map( user => { return{
            id: user.id,
            nickName: user.nickname,
            created: user.VG_user.createdAt.toISOString().slice(0, 10),
            lastUpdate: user.VG_user.updatedAt.toISOString().slice(0, 10),
            review: user.VG_user.review
        }})

        const graphics = gamebyId.Users.filter( user => isNumeric(user.VG_user.graphics)).map( user => user.VG_user.graphics)

        const gameplay = gamebyId.Users.filter( user => isNumeric(user.VG_user.gameplay)).map( user => user.VG_user.gameplay)

        const quality_price = gamebyId.Users.filter( user => isNumeric(user.VG_user.quality_price)).map( user => user.VG_user.quality_price)

        const gamesParsed = {
            id: gamebyId.id,
            name: gamebyId.name,
            description: gamebyId.description,
            image: gamebyId.image,
            price: gamebyId.price,
            released: gamebyId.released,
            genres: gamebyId.genres.map( g => g.name),
            platforms: gamebyId.platforms.map( p => p.name),
            reviews,
            graphics,
            gameplay,
            quality_price
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