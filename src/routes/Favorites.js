const { Router } = require("express") ;
const { Videogame, User, VG_user } = require('../db')
//const { getAllVGHandler, postVGHandler } = require("../handlers/VGHandler.js") ;

const FBrouter = Router()

FBrouter.post('/', async ( req, res) => {
    try {
        console.log('body', req.body);
        const {UserId, GameId} = req.body
        const usuario = await User.findByPk(UserId);
        const juego = await Videogame.findByPk(GameId);
        
        const relation = await VG_user.findOne({ where: { 
            UserId: UserId,
            VideogameId: GameId
        } })

        if(relation){
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
        
        res.status(200).json({
            succses: 'favorito creado'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports =  FBrouter