const { Op } = require('sequelize')
const { User, Videogame, VG_user } = require('../db') 


const getAllUserHandler = async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: {
                model: Videogame,
            }
        })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postUserHandler = async (req, res) => {
    try {
        const {name, lastname, nickname, password, Email, image} = req.body
        if(!name || !lastname || !nickname || !password || !Email ) return res.status(400).json({error: "missing data to be filled in"})

        const userNick = await User.findOne({
            where: { nickname: nickname}
        })
        if(userNick) return res.status(400).json({error: "nickname already exists, choose another one."})

        const userEmail = await User.findOne({
            where: { Email: Email}
        })
        if(userEmail) return res.status(400).json({error: "Email already exists, choose another one."})

        await User.create({name, lastname, nickname, password, Email, image})
        res.status(200).json({
            succses: 'The user was successfully uploaded to the database'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
   
}

const loginUserHandler = async (req, res) => {
    try {
        const {nick_email, password} = req.body //{, Email}
        if(!password) return res.status(400).json({error: "password is missing"})
        if(!nick_email) return res.status(400).json({error: "nickname or Email is missing"})

        let user = await User.findAll({
            where: {
                password: password,
            }
        })

        user = user.filter( user => { return(user.nickname === nick_email || user.Email === nick_email)})[0] 

        res.status(200).json(user)

        

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
/* body:
{
    "UserId": "562d5708-b44b-4db6-9834-96fa7e7c3074",
    "reviews": [
        {
            "GameId": "ec7319b8-023a-464a-bf6e-b4eb90099e44",
            "review": "pepe's review 1"
        },
        {
            "GameId": "8cb1f625-c4c0-4c49-b456-6d256960f1e4",
            "review": "pepe's review 2"
        },
        {
            "GameId": "692de331-0a79-4f66-8bf6-817feec076d5",
            "review": "pepe's review 3"
        }
    ],
    "favorites": [
        "87a2eeba-2ccb-4274-84aa-a35758c70075",
        "c3bafd8c-26e9-4740-aba4-d3f52be48927"
    ],
    "purchased": [
        "44cb4703-1c8a-4c4b-b9a0-ba6dedc36763",
        "1a149c71-0220-4f20-a16d-65885c56875e"
    ],
    "graphics": [
        {
            "GameId": "e19e60be-1711-43e3-8499-296b7e6b8d38",
            "stars": 3
        },
        {
            "GameId": "d2fc6a39-b171-4426-8c73-98eb842239c0",
            "stars": 4
        }
    ],
    "gameplay": [
        {
            "GameId": "e19e60be-1711-43e3-8499-296b7e6b8d38",
            "stars": 2
        },
        {
            "GameId": "6e3753a8-4a7c-4733-90d8-31fe91585e63",
            "stars": 5
        }
    ],
    "quality_price": [
        {
            "GameId": "d4f94f57-8d56-4538-a5c5-74b3f3e9b992",
            "stars": 3
        },
        {
            "GameId": "bfb2c1a4-00fe-42be-82d6-7b741823e0da",
            "stars": 2
        }
    ]
}
*/

const VG_userHandler = async (req, res) => {
    const {UserId, favorites, reviews} = req.body
    try {
        ////→→ carga los favoritos ←←////
        // → busca favoritos previos:
        const userFavRelation_prev = await VG_user.findAll({ where: {
            UserId: UserId,
            favorites: true
        }})
        // → elimina los favoritos previos:
        for(const relation of userFavRelation_prev){
            await VG_user.update({ favorites: false}, {
                where: {
                    UserId: UserId,
                    VideogameId: relation.dataValues.VideogameId
                }
            })
        }
        // → coloca los nuevos favoritos:
        for(const GameId of favorites){

            const userFavRelation = await VG_user.findOne({ where: { 
                UserId: UserId,
                VideogameId: GameId
            } })

            if(userFavRelation){
                await VG_user.update({ favorites: true }, {
                    where: {
                        UserId: UserId,
                        VideogameId: GameId
                    }
                  });
            } else{
                await VG_user.create({
                    UserId: UserId,
                    VideogameId: GameId,
                    favorites: true,
                  });
            }
        }

        ////→→ carga los Reviews ←←////
        // → busca reviews previos:
        const userRevRelation_prev = await VG_user.findAll({
            where: {
              UserId: UserId,
              review: {
                [Op.not]: ''
              }
            }
          });
        // → elimina los reviews previos:
        for(const relation of userRevRelation_prev){
            await VG_user.update({ review: ''}, {
                where: {
                    UserId: UserId,
                    VideogameId: relation.dataValues.VideogameId
                }
            })
        }
        // → coloca los nuevos reviews:
        for(const reviewFromUser of reviews){

            const userRevRelation = await VG_user.findOne({ where: { 
                UserId: UserId,
                VideogameId: reviewFromUser.GameId
            } })

            if(userRevRelation){
                await VG_user.update({ review: reviewFromUser.review }, {
                    where: {
                        UserId: UserId,
                        VideogameId: reviewFromUser.GameId
                    }
                  });
            } else{
                await VG_user.create({
                    UserId: UserId,
                    VideogameId: reviewFromUser.GameId,
                    review: reviewFromUser.review,
                  });
            }
        }

        
        //// → Destrulle relaciones innecesareas:

        /*const unusedRelations = await VG_user.findAll({where: {
            favorites: false,
            com
        }})*/

        res.status(200).json({ succses: 'add favorites && reviews' })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllUserHandler,
    postUserHandler,
    loginUserHandler,
    VG_userHandler
}