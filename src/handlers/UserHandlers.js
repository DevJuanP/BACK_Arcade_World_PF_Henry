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

/*
body:{
    "name": "pepe",
    "lastname": "gonzales",
    "nickname": "pepis",
    "password": "1654ddws",
    "Email": "kjhgb@jh.iyg"
}
*/
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
            succses: 'The user was successfully uploaded to database'
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

        let user = await User.findOne({
            where: {
                password: password,
                [Op.or]: [
                    { Email: nick_email },
                    { nickname: nick_email }
                ]
            }
        })
        
        console.log(user);
        if(!user) return res.status(400).json({
            login: false,
            error: {message: 'User not found. Password, Nickname or Email incorrect.'}
        })
        
        res.status(200).json({
            login: true,
            user: user
        })

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
/* body:
{
    "UserId": "562d5708-b44b-4db6-9834-96fa7e7c3074",
    "reviews": [
        {
            "GameId": "2340cc61-9499-4739-bf7c-da2feda1318a",
            "review": "pepe's review 1"
        },
        {
            "GameId": "c8de1771-1383-473d-a3c1-bfb7b0d3145f",
            "review": "pepe's review 2"
        },
        {
            "GameId": "1d74c245-6d23-404b-b803-85b08f55bf4c",
            "review": "pepe's review 3"
        }
    ],
    "favorites": [
        "f6e1a380-8bec-487e-b797-dda63a821e24",
        "97e485cc-e98f-479d-8f6a-03782dbb681f"
    ],
    "purchased": [
        "f4053fc8-5436-4e32-b0f4-3b71324d5e12",
        "21feb45d-ea65-4bed-9785-6abf879c16db"
    ],
    "graphics": [
        {
            "GameId": "21feb45d-ea65-4bed-9785-6abf879c16db",
            "stars": 3
        },
        {
            "GameId": "f552e940-cf89-45d0-9047-ce1d3ada0d3f",
            "stars": 4
        }
    ],
    "gameplay": [
        {
            "GameId": "f552e940-cf89-45d0-9047-ce1d3ada0d3f",
            "stars": 2
        },
        {
            "GameId": "dd2d915f-bbb7-4c90-adac-d9b49283769f",
            "stars": 5
        }
    ],
    "quality_price": [
        {
            "GameId": "dd2d915f-bbb7-4c90-adac-d9b49283769f",
            "stars": 3
        },
        {
            "GameId": "632a3070-2ca3-4136-87b9-d1221958191b",
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
            purchased: false,
            review: '',
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