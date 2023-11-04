const { User, VG_user, Videogame } = require('../db')
const { Op } = require('sequelize')
const Stripe = require('stripe')
require('dotenv').config()
const { STRIPE_KEY } = process.env
const stripe = Stripe(STRIPE_KEY)

const purchasedhandler = async (req, res) => {
    const {UserId, GamesIds} = req.body
    try {
        const user = await User.findOne({
            where: {
                id: UserId
            }
        })

        const games = await Videogame.findAll({// si algun id no existe compra los que si XD
            where: {
                [Op.or]:GamesIds.map( gameId => {
                    return { id: gameId }
                })
            }
        })

        if(!user) return res.status(200).json({error: "id de usuario incorrecto"})

        const session = await stripe.checkout.sessions.create({
            line_items: games.map( vg => {
                return{
                    price_data:{
                        product_data:{
                            name: vg.name,
                            description: `I have no doubt that ${vg.name} will be a source of excitement for you.`
                        },
                        currency: 'usd',
                        unit_amount: vg.price*100
                    },
                    quantity: 1
                }
            }),
            mode: 'payment',
            success_url: 'http://localhost:5173/cart/summary',
            cancel_url: `http://localhost:5173/cart/failed`,
          });

        res.status(200).json({session_url: session.url})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const cartSuccessHandler = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    purchasedhandler,
    cartSuccessHandler
}


/*
body:{
    UserId: hole-siaug54-hgd,
    GamesIds: [
        jlekevñ,
        jhllñk321,
        kdcjwlñ
    ]
}


//ruta cart/summary
//ruta cart/failed


*/