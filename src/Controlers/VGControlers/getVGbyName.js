const { Videogame, genre, platform } = require('../../db')
const { Op } = require('sequelize')

const getVGbyName =  async (name) => {

    const tofind = name.split(' ') //"war gragon" → ["war", "dragon"], ["portal"]
        let gameByName = await Videogame.findAll({
            where: {
                [Op.or]: tofind.map(str => {
                    return {
                        name: {
                            [Op.iLike]: `%${str}%`
                        }
                    };
                })
            },
            include:[
                {
                    model: genre,
                    attributes: ['name']
                },
                {
                    model: platform,
                    attributes: ['name']
                },
            ]
        })

        const gameByNameparsed = gameByName.map(vg => {
            return {
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

        return gameByNameparsed
}

module.exports = getVGbyName