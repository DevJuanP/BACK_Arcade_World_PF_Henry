const { Purchase, Videogame, User, platform, genre } = require('../db')
const parseDate = require('../utils/parseDate')

const getAllPurchases = async (req, res) => {
    try {
        const allPurchases = await Purchase.findAll({
            include: [
                {
                    model: Videogame,
                    include: [
                        {model: platform},
                        {model: genre}
                    ]
                },
                {model: User}
            ]
        })

        const parsePur = allPurchases.map( pur => {
            return{
                purchaseId: pur.id,
                userId: pur.User.id,
                amount: pur.amount,
                paymentMethod: pur.paymentMethod,
                date:parseDate(pur.createdAt).date,
                hour:parseDate(pur.createdAt).hour,
                username: pur.User.name,
                nickname: pur.User.nickname,
                Email: pur.User.Email,
                Videogames: pur.Videogames.map( vg => {
                    return {
                        GameId: vg.id,
                        name: vg.name,
                        image: vg.image,
                        platforms: vg.platforms.map( p => p.name),
                        genres: vg.genres.map( g => g.name )

                    }
                })
            }
        })

        res.status(200).json(parsePur)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports = {
    getAllPurchases
}